import glob
import os
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from tortoise import Tortoise, generate_config
from tortoise.contrib.fastapi import RegisterTortoise, register_tortoise

from .settings import get_settings

settings = get_settings()


def get_models_file_path() -> list[str]:
    return glob.glob("**/models.py", recursive=True)


def format_path(path: str) -> str:
    return path.rstrip(".py").replace("/", ".")


def get_models_path_list() -> list[str]:
    match_paths = get_models_file_path()
    mapped_paths = map(format_path, match_paths)
    return list(mapped_paths)


models_path_list = get_models_path_list()


def get_db_uri(*, user, password, host, db):
    return f"postgres://{user}:{password}@{host}:5432/{db}"


def setup_database(app: FastAPI):
    register_tortoise(
        app,
        db_url=get_db_uri(
            user=os.environ.get("POSTGRES_USER"),
            password=os.environ.get("POSTGRES_PASSWORD"),
            host="db",  # docker-composeのservice名
            db=os.environ.get("POSTGRES_DB"),
        ),
        modules={
            "models": models_path_list,
        },
        generate_schemas=True,
        add_exception_handlers=True,
    )


# Tortoise.init_models(models_path_list, "models")


@asynccontextmanager
async def lifespan_test(app: FastAPI) -> AsyncGenerator[None, None]:
    config = generate_config(
        os.getenv("TORTOISE_TEST_DB", "sqlite://:memory:"),
        app_modules={"models": ["models"]},
        testing=True,
        connection_label="models",
    )
    async with RegisterTortoise(
        app=app,
        config=config,
        generate_schemas=True,
        add_exception_handlers=True,
        _create_db=True,
    ):
        # db connected
        yield
        # app teardown
    # db connections closed
    await Tortoise._drop_databases()


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    if getattr(app.state, "testing", None):
        async with lifespan_test(app) as _:
            yield
    else:
        # app startup
        async with setup_database(app):
            # db connected
            yield
            # app teardown
        # db connections closed
