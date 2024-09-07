import logging
from typing import Annotated

from fastapi import (
    APIRouter,
    Depends,
    FastAPI,
    status,
)

from app.users.services import get_current_active_user

from .models import PurchaseItem, Room
from .schemas import (
    PurchaseItem_Pydantic,
    Room_Pydantic,
    RoomCreateRequest,
    RoomCreateResponse,
    RoomDetailResponse,
    RoomUpdateRequest,
)

logger = logging.getLogger("uvicorn.api")

app_name = "rooms"

router = APIRouter()


def setup_routers(app: FastAPI):
    app.include_router(
        router,
        prefix=f"/{app_name}",
        tags=[app_name],
    )


@router.post("/create", status_code=status.HTTP_201_CREATED)
async def create_room(
    create_room_request: RoomCreateRequest,
    _: Annotated[str, Depends(get_current_active_user)],
) -> RoomCreateResponse:
    room = Room(title=create_room_request.title, description="", closing_at=None)
    await room.save()
    room_id = str(room.id)
    return RoomCreateResponse(room_id=room_id)


@router.get("/{room_id}", status_code=status.HTTP_200_OK)
async def fetch_room(
    room_id: str, _: Annotated[str, Depends(get_current_active_user)]
) -> RoomDetailResponse:
    room = await Room.get(id=room_id)
    # NOTE: Tortoise ORMの場合awaitされていないクエリーはCoroutineではなくQuerySetになる
    raw_items = room.purchase_items.all()
    # NOTE: from_querysetはQuerySetを受け取る=awaitされていないクエリー
    items = await PurchaseItem_Pydantic.from_queryset(raw_items)
    room_obj = await Room_Pydantic.from_tortoise_orm(room)
    return RoomDetailResponse(
        id=room_obj.id,
        title=room_obj.title,
        description=room_obj.description,
        items=items,
        closing_at=room_obj.closing_at,
    )


@router.put("/{room_id}", status_code=status.HTTP_200_OK)
async def update_room(
    room_id: str,
    update_room_request: RoomUpdateRequest,
    _: Annotated[str, Depends(get_current_active_user)],
) -> RoomDetailResponse:
    await Room.get(id=room_id).update(
        **update_room_request.model_dump(exclude=["id", "items"])
    )
    updated_room = await Room.get(id=room_id)

    creating_items = list(filter(lambda x: x.id is None, update_room_request.items))
    if creating_items:
        items = [
            PurchaseItem(name=item.name, amount=item.amount, room_id=updated_room.id)
            for item in creating_items
        ]
        await PurchaseItem.bulk_create(items)
    updating_items = list(filter(lambda x: x.id is not None, update_room_request.items))
    if updating_items:
        items = [
            PurchaseItem(
                id=item.id,
                name=item.name,
                amount=item.amount,
                room_id=updated_room.id,
            )
            for item in updating_items
        ]
        await PurchaseItem.bulk_update(items, fields=["name", "amount", "room_id"])
    raw_items = updated_room.purchase_items.all()
    items = await PurchaseItem_Pydantic.from_queryset(raw_items)
    room_obj = await Room_Pydantic.from_tortoise_orm(updated_room)
    return RoomDetailResponse(
        id=room_obj.id,
        title=room_obj.title,
        description=room_obj.description,
        items=items,
        closing_at=room_obj.closing_at,
    )


@router.delete("/{room_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_room(
    room_id: str, _: Annotated[str, Depends(get_current_active_user)]
) -> None:
    await Room.get(id=room_id).update(is_active=False)
