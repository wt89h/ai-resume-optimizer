from openai import OpenAI
from app.core.config import settings
import json

class AIService:
    def __init__(self):
        self.api_key = settings.DEEPSEEK_API_KEY
        self.api_url = settings.DEEPSEEK_API_URL
        self.client = None
        self._init_client()
    
    def _init_client(self):
        """初始化DeepSeek客户端"""
        try:
            if self.api_key and self.api_key != "mock_api_key":
                self.client = OpenAI(
                    api_key=self.api_key,
                    base_url=self.api_url
                )
        except Exception as e:
            print(f"初始化DeepSeek客户端失败: {e}")
            self.client = None
    
    async def modify(self, analysis_id: str, strength: str, resume_content: dict = None, jd_content: dict = None) -> dict:
        """AI修改简历"""
        # 如果有真实API客户端且有内容，调用真实API
        if self.client and resume_content and jd_content:
            try:
                return await self._call_api(resume_content, jd_content, strength)
            except Exception as e:
                print(f"API调用失败，使用模拟数据: {e}")
                return self.get_mock_modification(strength)
        
        # 否则返回模拟数据
        return self.get_mock_modification(strength)
    
    async def _call_api(self, resume_content: dict, jd_content: dict, strength: str) -> dict:
        """调用DeepSeek API"""
        # 构建Prompt
        prompt = self._build_prompt(resume_content, jd_content, strength)
        
        # 调用API
        response = self.client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": "你是一位资深HR和职业规划师，擅长帮助求职者优化简历。请根据岗位JD需求，对简历进行针对性修改。"},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=2000
        )
        
        # 解析响应
        content = response.choices[0].message.content
        return self._parse_response(content, resume_content)
    
    def _build_prompt(self, resume_content: dict, jd_content: dict, strength: str) -> str:
        """构建Prompt"""
        strength_desc = {
            "light": "轻度优化：润色表达、调整语序、规范格式",
            "medium": "中度改写：强化相关经验、补充关键词、优化量化描述",
            "heavy": "深度重构：根据JD重新组织经历、调整简历侧重点"
        }
        
        prompt = f"""请根据以下岗位JD，对简历进行{strength_desc.get(strength, '中度改写')}。

## 岗位JD信息
职位名称：{jd_content.get('job_title', '未知')}
公司：{jd_content.get('company', '未知')}
岗位职责：
{chr(10).join(['- ' + item for item in jd_content.get('responsibilities', [])])}

任职要求：
{chr(10).join(['- ' + item for item in jd_content.get('requirements', [])])}

关键词：{', '.join(jd_content.get('keywords', []))}

## 当前简历内容
工作经历：
{resume_content.get('work_experience', '无')}

项目经验：
{resume_content.get('projects', '无')}

技能清单：
{resume_content.get('skills', '无')}

## 输出要求
请返回JSON格式的修改结果，包含以下字段：
1. modified_content: 修改后的内容（包含work_experience, projects, skills）
2. changes: 修改记录列表（每项包含section, original, modified, reason, type）

注意：
- 保持修改的自然性，避免关键词堆砌
- 使用STAR法则重构工作经历
- 添加量化成果和数据
- 突出与岗位相关的技能和经验
"""
        return prompt
    
    def _parse_response(self, content: str, original_content: dict) -> dict:
        """解析API响应"""
        try:
            # 尝试解析JSON
            result = json.loads(content)
            return {
                "original_content": original_content,
                "modified_content": result.get("modified_content", {}),
                "changes": result.get("changes", [])
            }
        except json.JSONDecodeError:
            # 如果JSON解析失败，尝试提取关键信息
            return {
                "original_content": original_content,
                "modified_content": original_content,
                "changes": [{
                    "section": "整体",
                    "original": str(original_content),
                    "modified": content,
                    "reason": "AI修改建议",
                    "type": "modify"
                }]
            }
    
    def get_mock_modification(self, strength: str) -> dict:
        """返回模拟修改结果"""
        if strength == "light":
            return self.get_light_modification()
        elif strength == "medium":
            return self.get_medium_modification()
        else:
            return self.get_heavy_modification()
    
    def get_light_modification(self) -> dict:
        """轻度优化"""
        return {
            "original_content": {
                "work_experience": "在公司做数据分析",
                "skills": "熟练使用Office办公软件"
            },
            "modified_content": {
                "work_experience": "负责数据分析工作，使用Python进行数据处理",
                "skills": "精通Python数据分析、SQL数据库查询、Excel高级功能"
            },
            "changes": [
                {
                    "section": "工作经历",
                    "original": "在公司做数据分析",
                    "modified": "负责数据分析工作，使用Python进行数据处理",
                    "reason": "优化表述，添加技术关键词",
                    "type": "modify"
                },
                {
                    "section": "技能清单",
                    "original": "熟练使用Office办公软件",
                    "modified": "精通Python数据分析、SQL数据库查询、Excel高级功能",
                    "reason": "突出技术技能，针对岗位需求",
                    "type": "modify"
                }
            ]
        }
    
    def get_medium_modification(self) -> dict:
        """中度改写"""
        return {
            "original_content": {
                "work_experience": "在公司做数据分析",
                "skills": "熟练使用Office办公软件"
            },
            "modified_content": {
                "work_experience": "负责数据分析项目，使用Python进行数据处理，通过数据挖掘优化业务流程，提升效率20%",
                "skills": "精通Python数据分析（Pandas、NumPy）、SQL数据库查询、Excel高级函数与数据透视表"
            },
            "changes": [
                {
                    "section": "工作经历",
                    "original": "在公司做数据分析",
                    "modified": "负责数据分析项目，使用Python进行数据处理，通过数据挖掘优化业务流程，提升效率20%",
                    "reason": "使用STAR法则重构，添加量化成果和技能关键词",
                    "type": "modify"
                },
                {
                    "section": "技能清单",
                    "original": "熟练使用Office办公软件",
                    "modified": "精通Python数据分析（Pandas、NumPy）、SQL数据库查询、Excel高级函数与数据透视表",
                    "reason": "针对岗位需求，突出技术技能",
                    "type": "modify"
                }
            ]
        }
    
    def get_heavy_modification(self) -> dict:
        """深度重构"""
        return {
            "original_content": {
                "work_experience": "在公司做数据分析",
                "skills": "熟练使用Office办公软件"
            },
            "modified_content": {
                "work_experience": "主导公司核心业务数据分析项目，运用Python（Pandas、NumPy）和SQL构建数据指标体系，监控业务运营状况，通过数据挖掘发现业务痛点并提出优化方案，助力业务增长15%",
                "skills": "精通Python数据分析（Pandas、NumPy）、SQL高级查询、数据可视化（Tableau、Power BI）、机器学习基础（Scikit-learn）"
            },
            "changes": [
                {
                    "section": "工作经历",
                    "original": "在公司做数据分析",
                    "modified": "主导公司核心业务数据分析项目，运用Python（Pandas、NumPy）和SQL构建数据指标体系，监控业务运营状况，通过数据挖掘发现业务痛点并提出优化方案，助力业务增长15%",
                    "reason": "深度重构，突出主导能力和业务价值，添加量化成果",
                    "type": "modify"
                },
                {
                    "section": "技能清单",
                    "original": "熟练使用Office办公软件",
                    "modified": "精通Python数据分析（Pandas、NumPy）、SQL高级查询、数据可视化（Tableau、Power BI）、机器学习基础（Scikit-learn）",
                    "reason": "全面升级技能描述，匹配高级岗位要求",
                    "type": "modify"
                }
            ]
        }
