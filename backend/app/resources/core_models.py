from tortoise import fields
from tortoise.models import Model


class CoreModel(Model):
    id = fields.UUIDField(pk=True)
    timestamp = fields.DatetimeField(auto_now_add=True)
    updated = fields.DatetimeField(auto_now=True)
    is_active = fields.BooleanField(default=True)

    class Meta:
        abstract = True

    class PydanticMeta:
        exclude = ('user', 'user_id', 'timestamp', 'updated', 'is_active',)
