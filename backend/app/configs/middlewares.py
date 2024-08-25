from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.configs.settings import get_settings

settings = get_settings()


def setup_middleware(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allow_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
