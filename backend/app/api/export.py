from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from app.services.export_service import ExportService

router = APIRouter()

@router.get("/{modification_id}")
async def export_resume(modification_id: str, format: str = "pdf"):
    """导出简历"""
    if format not in ["pdf", "docx"]:
        raise HTTPException(
            status_code=400,
            detail="导出格式必须为 pdf 或 docx"
        )
    
    export_service = ExportService()
    file_content, filename = await export_service.export(modification_id, format)
    
    media_type = "application/pdf" if format == "pdf" else "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    
    return StreamingResponse(
        iter([file_content]),
        media_type=media_type,
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )
