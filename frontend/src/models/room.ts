import dayjs from "dayjs";

export type PurchaseItem = {
  id: string;
  name: string;
  amount: number;
};

export type RoomDetailResponse = {
  id: string;
  title: string;
  description?: string;
  items: PurchaseItem[];
  closingAt: string;
};

export type RoomDetail = {
  id: string;
  title: string;
  description?: string;
  items: PurchaseItem[];
  closingAt: dayjs.Dayjs;
};

export type RoomForm = Omit<RoomDetail, "closingAt">;

export type RoomCreateForm = {
  name: string;
};

export type RoomCreateResponse = {
  roomId: string;
};
