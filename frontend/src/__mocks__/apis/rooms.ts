import { HttpStatusCode } from "axios";
import { http, HttpHandler, HttpResponse, PathParams } from "msw";
import { v4 as uuidv4 } from "uuid";

import { RoomCreateForm, RoomCreateResponse } from "~/models";

import { roomDetail } from "../data/rooms";
import { badRequestMockResponse } from "./commonResponse";

const url = import.meta.env.VITE_API_URL;

type MockApis = {
  fetchRoom: HttpHandler;
  createRoom: HttpHandler;
};

export const roomMockApis: MockApis = {
  fetchRoom: http.get(`${url}/rooms/:id`, ({ params }) => {
    const roomId = params.id;

    if (!roomId) {
      return badRequestMockResponse;
    }

    return HttpResponse.json(roomDetail, { status: HttpStatusCode.Ok });
  }),
  createRoom: http.post<PathParams, RoomCreateForm>(
    `${url}/rooms/create`,
    async ({ request }) => {
      const { name } = await request.json();

      if (!name) {
        return badRequestMockResponse;
      }

      const data: RoomCreateResponse = {
        roomId: uuidv4(),
      };
      return HttpResponse.json(data);
    }
  ),
};
