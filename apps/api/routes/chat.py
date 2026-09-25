from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from apps.api.services.llm_service import LLMService


router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=10000)
    model: str = "openai/gpt-oss-20b"


class ChatResponse(BaseModel):
    status: str
    model: str
    message: str
    response: str


@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        service = LLMService()

        generated_response = await service.generate(
            message=request.message,
            model=request.model,
        )

        return ChatResponse(
            status="success",
            model=request.model,
            message=request.message,
            response=generated_response,
        )

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error),
        )