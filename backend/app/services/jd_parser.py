class JDParser:
    async def parse(self, text: str) -> dict:
        """解析JD文本"""
        # 这里可以调用AI模型进行更精确的解析
        # 目前返回模拟数据
        return self.get_mock_data(text)
    
    def get_mock_data(self, text: str) -> dict:
        """返回模拟JD数据"""
        return {
            "job_title": "高级数据分析师",
            "company": "XYZ互联网公司",
            "responsibilities": [
                "负责公司核心业务的数据分析工作",
                "构建数据指标体系，监控业务运营状况",
                "使用SQL和Python进行数据提取和处理",
                "制作数据可视化报表，支持业务决策"
            ],
            "requirements": [
                "本科及以上学历，计算机、统计学等相关专业",
                "3年以上数据分析经验",
                "熟练使用SQL、Python（Pandas、NumPy）",
                "熟悉数据可视化工具（Tableau、Power BI）",
                "具备良好的沟通能力和团队协作精神"
            ],
            "keywords": ["数据分析", "Python", "SQL", "数据可视化", "业务分析"],
            "hard_requirements": {
                "education": "本科",
                "experience": "3年",
                "skills": ["Python", "SQL", "数据分析"]
            },
            "soft_requirements": ["沟通能力", "团队协作", "逻辑思维"]
        }
