import logging
from datetime import date, datetime
from uuid import UUID

from humps import camelize
from pydantic import BaseModel, field_validator
from tortoise.contrib.pydantic import pydantic_model_creator

from .models import PurchaseItem, Room

logger = logging.getLogger("uvicorn.api")


class Item(BaseModel):
    id: str | None = None
    name: str
    amount: int

    class Config:
        alias_generator = camelize
        populate_by_name = True


PurchaseItem_Pydantic = pydantic_model_creator(PurchaseItem, name="PurchaseItem")


class RoomDetailResponse(BaseModel):
    id: UUID
    title: str
    description: str | None = None
    items: list[PurchaseItem_Pydantic]
    closing_at: date | None

    class Config:
        alias_generator = camelize
        populate_by_name = True

    @field_validator("closing_at", mode="before")
    @classmethod
    def transform_closing_at(cls, raw: datetime | None) -> date | None:
        if raw is None:
            return None
        try:
            return raw.date()
        except Exception as err:
            logger.error(err)
            return None


class RoomUpdateRequest(BaseModel):
    id: str
    title: str
    description: str | None = None
    items: list[Item]

    class Config:
        alias_generator = camelize
        populate_by_name = True


class RoomCreateRequest(BaseModel):
    title: str

    class Config:
        alias_generator = camelize
        populate_by_name = True


class RoomCreateResponse(BaseModel):
    room_id: str

    class Config:
        alias_generator = camelize
        populate_by_name = True


Room_Pydantic = pydantic_model_creator(Room, name="Room")
RoomIn_Pydantic = pydantic_model_creator(Room, name="RoomIn", exclude_readonly=True)
