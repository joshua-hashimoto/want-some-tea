from typing import Annotated

from fastapi import APIRouter, Depends, FastAPI

from app.resources.logger import get_logger

from .schemas import User, User_Pydantic
from .services import get_current_active_user

logger = get_logger()

app_name = "users"

router = APIRouter()


def setup_routers(app: FastAPI):
    app.include_router(
        router,
        prefix=f"/{app_name}",
        tags=[app_name],
    )


@router.get("/me", response_model=User_Pydantic)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return await User_Pydantic.from_tortoise_orm(current_user)
