import logging
from datetime import datetime, timedelta, timezone
from typing import Annotated, Literal, Optional, Union

from fastapi import Depends, HTTPException, Request, status
from fastapi.openapi.models import OAuthFlows as OAuthFlowsModel
from fastapi.security import OAuth2
from fastapi.security.utils import get_authorization_scheme_param
from jose import jwt
from jose.exceptions import JWTError

from app.configs.settings import get_settings
from app.users.schemas import User, UserIn_Pydantic

logger = logging.getLogger("uvicorn.backend")


settings = get_settings()

SECRET_KEY = settings.secret_key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "disabled": False,
    }
}


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
oauth2_scheme_cookie = OAuth2PasswordBearerWithCookie(tokenUrl="auth/login")


def get_user(db, username: str) -> User | None:
    if username in db:
        user_dict = db[username]
        return UserIn_Pydantic(**user_dict)
    return None


def authenticate_user(fake_db, username: str, password: str) -> User | Literal[False]:
    user = get_user(fake_db, username)
    if not user:
        return False
    if not user.verify_password(password):
        return False
    return user


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
    logger.info(token)
    credentials_exceptions = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Cloud not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str | None = payload.get("sub")
        if username is None:
            raise credentials_exceptions
    except JWTError as err:
        raise credentials_exceptions from err
    user = get_user(fake_users_db, username=username)
    if user is None:
        raise credentials_exceptions
    return user


async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user
