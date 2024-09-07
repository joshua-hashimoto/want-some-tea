from pydantic import BaseModel


class SignUpRequest(BaseModel):
    email: str
    nickname: str
    password: str
    confirm_password: str
