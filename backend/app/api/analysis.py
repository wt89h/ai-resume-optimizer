from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.analyzer import Analyzer

router = APIRouter()

class AnalysisRequest(BaseModel):
    resume_id: str
    jd_id: str

@router.post("/analyze")
async def analyze_match(request: AnalysisRequest):
    """分析简历与JD的匹配度"""
    analyzer = Analyzer()
    result = await analyzer.analyze(request.resume_id, request.jd_id)
    
    return {
        "analysis_id": "mock_analysis_001",
        "resume_id": request.resume_id,
        "jd_id": request.jd_id,
        **result
    }
