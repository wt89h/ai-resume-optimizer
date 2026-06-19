from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.jd_parser import JDParser

router = APIRouter()

class JDRequest(BaseModel):
    text: str

@router.post("/parse")
async def parse_jd(request: JDRequest):
    """解析JD文本"""
    if not request.text.strip():
        raise HTTPException(
            status_code=400,
            detail="JD文本不能为空"
        )
    
    parser = JDParser()
    result = await parser.parse(request.text)
    
    return {
        "jd_id": "mock_jd_001",
        "parsed_content": result
    }
