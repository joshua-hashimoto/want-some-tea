from typing import Annotated

from fastapi import APIRouter, Depends, FastAPI

from app.resources.exception_handlers import BadRequestException

from .schemas import User, User_Pydantic
from .services import get_current_active_user

app_name = "users"

router = APIRouter()


def setup_routers(app: FastAPI):
    app.include_router(
        router,
        prefix=f"/{app_name}",
        tags=[app_name],
    )


@router.get("/users/me")
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    try:
        return await User_Pydantic.from_tortoise_orm(current_user)
    except Exception as err:
        raise BadRequestException() from err
