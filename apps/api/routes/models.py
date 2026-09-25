from fastapi import APIRouter

router = APIRouter(
    prefix="/models",
    tags=["Models"],
)


@router.get("/")
async def list_models():
    return {
        "status": "success",
        "total": 3,
        "models": [
            {
                "provider": "Groq",
                "model": "openai/gpt-oss-20b",
                "status": "available",
                "type": "cloud",
            },
            {
                "provider": "Hugging Face",
                "model": "transformers",
                "status": "planned",
                "type": "cloud",
            },
            {
                "provider": "Local",
                "model": "Ollama",
                "status": "planned",
                "type": "local",
            },
        ],
    }