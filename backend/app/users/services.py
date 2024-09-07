import logging
from datetime import datetime, timedelta, timezone
from typing import Annotated, Optional, Union

from fastapi import Depends, HTTPException, Request, status
from fastapi.openapi.models import OAuthFlows as OAuthFlowsModel
from fastapi.security import OAuth2
from fastapi.security.utils import get_authorization_scheme_param
from jose import jwt
from jose.exceptions import JWTError

from app.configs.settings import get_settings

from .schemas import User

logger = logging.getLogger("uvicorn.api")


settings = get_settings()

SECRET_KEY = settings.secret_key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


class OAuth2PasswordBearerWithCookie(OAuth2):
    def __init__(
        self,
        tokenUrl: str,
        scheme_name: Optional[str] = None,
        scopes: Optional[dict[str, str]] = None,
        auto_error: bool = True,
    ):
        if not scopes:
            scopes = {}
        flows = OAuthFlowsModel(password={"tokenUrl": tokenUrl, "scopes": scopes})
        super().__init__(flows=flows, scheme_name=scheme_name, auto_error=auto_error)

    async def __call__(self, request: Request) -> Optional[str]:
        authorization: str = request.cookies.get(
            "access_token"
        )  # changed to accept access token from httpOnly Cookie

        scheme, param = get_authorization_scheme_param(authorization)
        if not authorization or scheme.lower() != "bearer":
            if self.auto_error:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Not authenticated",
                    headers={"WWW-Authenticate": "Bearer"},
                )
            else:
                return None
        return param


"""NOTE
ここでは、tokenUrlに設定されているエンドポイント/tokenにはprefixがされている
ため、ここでの設定もそれに合わせてエンドポイントを設定する
"""
oauth2_scheme_cookie = OAuth2PasswordBearerWithCookie(tokenUrl="auth/sign-in")


async def get_user(username: str) -> User | None:
    try:
        user = await User.get(email=username, is_active=True)
        return user
    except Exception as err:
        raise HTTPException(status_code=400, detail="Inactive user") from err


async def authenticate_user(username: str, password: str) -> User:
    user_exception = HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail="Invalid User"
    )
    try:
        user = await get_user(username)
        if not user or not user.verify_password(password):
            raise user_exception
        return user
    except Exception as err:
        raise user_exception from err


def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme_cookie)]):
    bad_request_exception = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST, detail="your request is not valid"
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str | None = payload.get("sub")
        if username is None:
            raise bad_request_exception
    except JWTError as err:
        raise bad_request_exception from err
    user = await get_user(username=username)
    if user is None:
        raise bad_request_exception
    return user


async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
):
    return current_user
