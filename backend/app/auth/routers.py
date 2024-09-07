import logging
from datetime import timedelta
from typing import Annotated

from fastapi import (
    APIRouter,
    Body,
    Depends,
    FastAPI,
    Response,
    status,
)
from fastapi.security import OAuth2PasswordRequestForm

from app.configs.settings import get_settings
from app.resources.exception_handlers import BadRequestException
from app.users.models import User
from app.users.services import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    authenticate_user,
    create_access_token,
    get_current_active_user,
)

from .schemas import SignUpRequest
from .services import get_password_hash

logger = logging.getLogger("uvicorn.api")

settings = get_settings()

app_name = "auth"

router = APIRouter()


def setup_routers(app: FastAPI):
    app.include_router(
        router,
        prefix=f"/{app_name}",
        tags=[app_name],
    )


@router.post("/sign-in", response_model=None)
async def sign_in_user(
    response: Response, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
):
    user = await authenticate_user(form_data.username, form_data.password)
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email},
        expires_delta=access_token_expires,
    )
    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
        expires=access_token_expires,
    )


@router.post("/sign-out", response_model=None)
async def sign_out_user(
    response: Response, access_token: Annotated[str, Depends(get_current_active_user)]
):
    response.delete_cookie("access_token")


@router.post("/sign-up", status_code=status.HTTP_201_CREATED)
async def sign_up_user(sign_up_request: SignUpRequest = Body(...)):
    password = sign_up_request.password
    confirm_password = sign_up_request.confirm_password
    if password != confirm_password:
        raise BadRequestException()
    user = User(
        email=sign_up_request.email,
        nickname=sign_up_request.nickname,
        password_hash=get_password_hash(sign_up_request.password),
    )
    await user.save()
