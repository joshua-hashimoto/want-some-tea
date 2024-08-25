from fastapi import FastAPI

from .routers import setup_routers


def setup_auth(app: FastAPI):
    setup_routers(app)
