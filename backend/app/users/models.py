from passlib.hash import bcrypt
from tortoise import fields

from app.resources.core_models import CoreModel


class User(CoreModel):
    nickname = fields.CharField(50, unique=True)
    email = fields.CharField(60, unique=True)
    password_hash = fields.CharField(128)

    class PydanticMeta(CoreModel.PydanticMeta):
        exclude = (
            *CoreModel.PydanticMeta.exclude,
            "password_hash",
        )

    def __str__(self):
        return self.email

    def verify_password(self, password):
        return bcrypt.verify(password, self.password_hash)
