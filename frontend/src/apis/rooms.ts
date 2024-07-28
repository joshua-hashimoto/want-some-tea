import { AxiosInstance, AxiosResponse } from "axios";

import {
  RoomCreateForm,
  RoomCreateResponse,
  RoomDetailResponse,
  RoomForm,
} from "~/models";

type RoomsEndpoints = {
  createRoom: (
    postData: RoomCreateForm
  ) => Promise<AxiosResponse<RoomCreateResponse>>;
  fetchRoom: (id: string) => Promise<AxiosResponse<RoomDetailResponse>>;
  updateRoom: (
    id: string,
    postData: RoomForm
  ) => Promise<AxiosResponse<RoomDetailResponse>>;
  deleteRoom: (id: string) => Promise<AxiosResponse<void>>;
};

export const roomsEndpoints = (client: AxiosInstance): RoomsEndpoints => ({
  createRoom: (postData: RoomCreateForm) => {
    const url = "rooms/create";
    return client.post(url, postData);
  },
  fetchRoom: (id: string) => {
    const url = `rooms/${id}`;
    return client.get(url);
  },
  updateRoom: (id: string, postData: RoomForm) => {
    const url = `rooms/${id}`;
    return client.put(url, postData);
  },
  deleteRoom: (id: string) => {
    const url = `rooms/${id}`;
    return client.delete(url);
  },
});
