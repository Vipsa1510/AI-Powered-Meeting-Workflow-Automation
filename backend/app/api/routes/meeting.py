from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form
)

from app.services.llm_service import LLMService
from app.services.email_service import EmailService
from app.utils.file_handler import read_uploaded_file


router = APIRouter(
    prefix="/meeting",
    tags=["Meeting"]
)


# ==========================================
# ANALYZE MEETING
# ==========================================

@router.post("/analyze")
async def analyze_meeting(
    text: str = Form(default=""),
    file: UploadFile = File(default=None)
):

    try:

        transcript = ""

        # TEXT INPUT
        if text.strip():

            transcript = text

        # FILE INPUT
        elif file is not None:

            print("FILE RECEIVED:", file.filename)

            transcript = await read_uploaded_file(
                file
            )

        else:

            return {
                "success": False,
                "message": "No input provided"
            }

        print("TRANSCRIPT:")
        print(transcript[:500])

        # AI ANALYSIS
        result = LLMService.analyze_meeting(
            transcript
        )

        return {
            "success": True,
            "data": result
        }

    except Exception as e:

        print("ANALYZE ERROR:", str(e))

        return {
            "success": False,
            "message": str(e)
        }


# ==========================================
# GENERATE EMAIL
# ==========================================

@router.post("/generate-email")
async def generate_email(payload: dict):

    try:

        email = EmailService.generate_email(
            payload["summary"],
            payload["action_items"]
        )

        return {
            "success": True,
            "email": email
        }

    except Exception as e:

        print("EMAIL ERROR:", str(e))

        return {
            "success": False,
            "message": str(e)
        }