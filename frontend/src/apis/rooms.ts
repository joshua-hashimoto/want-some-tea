import { AxiosInstance, AxiosResponse } from "axios";

import {
  RoomCreateForm,
  RoomCreateResponse,
  RoomDetailResponse,
} from "~/models";

type RoomsEndpoints = {
  fetchRoom: (id: string) => Promise<AxiosResponse<RoomDetailResponse>>;
  createRoom: (
    postData: RoomCreateForm
  ) => Promise<AxiosResponse<RoomCreateResponse>>;
};

export const roomsEndpoints = (client: AxiosInstance): RoomsEndpoints => ({
  fetchRoom: (id: string) => {
    const url = `rooms/${id}`;
    return client.get(url);
  },
  createRoom: (postData: RoomCreateForm) => {
    const url = "rooms/create";
    return client.post(url, postData);
  },
});
