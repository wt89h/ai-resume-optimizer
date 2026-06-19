import os

class Settings:
    # 应用配置
    APP_NAME = "AI简历智能修改系统"
    APP_VERSION = "1.0.0"
    
    # DeepSeek API配置
    DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY", "mock_api_key")
    DEEPSEEK_API_URL = os.getenv("DEEPSEEK_API_URL", "https://api.deepseek.com")
    
    # 文件配置
    MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
    ALLOWED_EXTENSIONS = [".pdf", ".docx"]
    
    # CORS配置
    CORS_ORIGINS = ["http://localhost:5173", "http://localhost:3000"]

settings = Settings()
