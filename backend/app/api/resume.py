from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.resume_parser import ResumeParser

router = APIRouter()

@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    """上传简历并解析"""
    # 检查文件类型
    allowed_types = [".pdf", ".docx"]
    file_ext = "." + file.filename.split(".")[-1].lower()
    
    if file_ext not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail=f"不支持的文件格式，仅支持: {', '.join(allowed_types)}"
        )
    
    # 检查文件大小 (10MB)
    content = await file.read()
    if len(content) > 10 * 1024 * 1024:
        raise HTTPException(
            status_code=413,
            detail="文件大小超过限制（最大10MB）"
        )
    
    # 解析简历
    parser = ResumeParser()
    result = await parser.parse(content, file_ext)
    
    return {
        "resume_id": "mock_resume_001",
        "filename": file.filename,
        "parsed_content": result
    }
