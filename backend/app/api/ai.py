from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any
from app.services.ai_service import AIService

router = APIRouter()

class ModifyRequest(BaseModel):
    analysis_id: str
    strength: Optional[str] = "medium"  # light, medium, heavy
    resume_content: Optional[Dict[str, Any]] = None
    jd_content: Optional[Dict[str, Any]] = None

@router.post("/modify")
async def modify_resume(request: ModifyRequest):
    """AI修改简历"""
    if request.strength not in ["light", "medium", "heavy"]:
        raise HTTPException(
            status_code=400,
            detail="修改强度必须为 light、medium 或 heavy"
        )
    
    ai_service = AIService()
    result = await ai_service.modify(
        request.analysis_id, 
        request.strength,
        request.resume_content,
        request.jd_content
    )
    
    return {
        "modification_id": "mock_modification_001",
        "analysis_id": request.analysis_id,
        "strength": request.strength,
        **result
    }
