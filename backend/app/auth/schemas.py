from typing import Union

from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Union[str, None] = None


class SignUpRequest(BaseModel):
    email: str
    nichname: str
    password: str
    confirm_password: str
