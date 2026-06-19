import PyPDF2
from docx import Document
from io import BytesIO

class ResumeParser:
    async def parse(self, content: bytes, file_ext: str) -> dict:
        """解析简历文件"""
        if file_ext == ".pdf":
            return await self.parse_pdf(content)
        elif file_ext == ".docx":
            return await self.parse_docx(content)
        else:
            raise ValueError(f"不支持的文件格式: {file_ext}")
    
    async def parse_pdf(self, content: bytes) -> dict:
        """解析PDF文件"""
        try:
            pdf_reader = PyPDF2.PdfReader(BytesIO(content))
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
            
            return self.extract_resume_info(text)
        except Exception as e:
            return self.get_mock_data()
    
    async def parse_docx(self, content: bytes) -> dict:
        """解析Word文件"""
        try:
            doc = Document(BytesIO(content))
            text = "\n".join([para.text for para in doc.paragraphs])
            
            return self.extract_resume_info(text)
        except Exception as e:
            return self.get_mock_data()
    
    def extract_resume_info(self, text: str) -> dict:
        """从文本中提取简历信息"""
        # 这里可以使用NLP模型进行更精确的提取
        # 目前返回模拟数据
        return self.get_mock_data()
    
    def get_mock_data(self) -> dict:
        """返回模拟简历数据"""
        return {
            "personal_info": {
                "name": "张三",
                "email": "zhangsan@example.com",
                "phone": "13800138000",
                "location": "北京"
            },
            "education": [
                {
                    "school": "北京大学",
                    "degree": "本科",
                    "major": "计算机科学与技术",
                    "start_date": "2018-09",
                    "end_date": "2022-06"
                }
            ],
            "work_experience": [
                {
                    "company": "ABC科技有限公司",
                    "position": "数据分析师",
                    "start_date": "2022-07",
                    "end_date": "至今",
                    "description": "负责公司数据分析工作，使用Python进行数据处理和可视化"
                }
            ],
            "projects": [
                {
                    "name": "用户行为分析项目",
                    "description": "参与用户行为分析项目，使用机器学习算法构建用户画像"
                }
            ],
            "skills": ["Python", "SQL", "Excel", "数据分析"],
            "summary": "具有数据分析经验，熟悉Python和SQL，对数据敏感"
        }
