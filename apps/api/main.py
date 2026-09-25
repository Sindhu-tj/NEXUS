from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from apps.api.routes.chat import router as chat_router
from apps.api.routes.models import router as models_router


app = FastAPI(
    title="NEXUS",
    description="Advanced LLM Application Platform",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(models_router)
app.include_router(chat_router)


@app.get("/")
async def root():
    return {
        "name": "NEXUS",
        "status": "running",
        "message": "NEXUS LLM Platform is online",
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "service": "NEXUS API",
    }