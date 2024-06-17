import { v4 as uuidv4 } from "uuid";

import { PurchaseItem, RoomDetailResponse } from "~/models";

export const purchaseItems: PurchaseItem[] = [
  {
    id: uuidv4(),
    name: "Bacchus",
    amount: 2,
  },
  {
    id: uuidv4(),
    name: "じゃがりこ",
    amount: 1,
  },
  {
    id: uuidv4(),
    name: "モンスター",
    amount: 6,
  },
];

export const roomDetail: RoomDetailResponse = {
  id: uuidv4(),
  title: "Mock Room",
  description: "This is a description for the room",
  items: purchaseItems,
  closingAt: "2024-12-31",
};
