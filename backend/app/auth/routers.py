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
from app.resources.exception_handlers import BadRequestException, UnauthorizedException
from app.users.models import User
from app.users.services import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    authenticate_user,
    create_access_token,
    fake_users_db,
    get_current_active_user,
)

from .schemas import SignUpRequest
from .services import get_password_hash

logger = logging.getLogger(__name__)

settings = get_settings()

app_name = "auth"

router = APIRouter()


def setup_routers(app: FastAPI):
    app.include_router(
        router,
        prefix=f"/{app_name}",
        tags=[app_name],
    )


@router.post("/login", response_model=None)
async def login(
    response: Response, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
):
    user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    if not user:
        raise UnauthorizedException()

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username},
        expires_delta=access_token_expires,
    )
    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
        expires=access_token_expires,
    )


@router.post("/logout", response_model=None)
async def logout(
    response: Response, access_token: Annotated[str, Depends(get_current_active_user)]
):
    response.delete_cookie("access_token")


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(sign_up_request: SignUpRequest = Body(...)):
    try:
        password = sign_up_request.password
        confirm_password = sign_up_request.confirm_password
        if password != confirm_password:
            raise BadRequestException()
        user = User(
            email=sign_up_request.email,
            nickname=sign_up_request.nichname,
            password_hash=get_password_hash(sign_up_request.password),
        )
        await user.save()
    except Exception as err:
        raise BadRequestException() from err
