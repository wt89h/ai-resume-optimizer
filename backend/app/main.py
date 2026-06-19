from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import resume, jd, analysis, ai, export

app = FastAPI(
    title="AI简历智能修改系统",
    description="基于大语言模型的智能简历优化工具",
    version="1.0.0"
)

# CORS配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(resume.router, prefix="/api/resume", tags=["简历"])
app.include_router(jd.router, prefix="/api/jd", tags=["JD"])
app.include_router(analysis.router, prefix="/api/analysis", tags=["分析"])
app.include_router(ai.router, prefix="/api/ai", tags=["AI"])
app.include_router(export.router, prefix="/api/export", tags=["导出"])

@app.get("/")
async def root():
    return {"message": "AI简历智能修改系统 API"}

@app.get("/health")
async def health():
    return {"status": "healthy"}
