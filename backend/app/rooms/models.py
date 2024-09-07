from tortoise import fields

from app.resources.core_models import CoreModel


class Room(CoreModel):
    title = fields.CharField(120)
    description = fields.TextField()
    closing_at = fields.DatetimeField(auto_now_add=False, auto_now=False, null=True)

    class Meta:
        table = "rooms"

    def __str__(self):
        return self.title


class PurchaseItem(CoreModel):
    name = fields.CharField(120)
    amount = fields.IntField(default=0)
    room = fields.ForeignKeyField("models.Room", related_name="purchase_items")

    class Meta:
        table = "purchase_items"

    def __str__(self):
        return self.name
