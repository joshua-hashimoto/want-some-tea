import { HttpStatusCode } from "axios";
import { http, HttpHandler, HttpResponse, PathParams } from "msw";
import { v4 as uuidv4 } from "uuid";

import {
  RoomCreateForm,
  RoomCreateResponse,
  RoomDetailResponse,
  RoomForm,
} from "~/models";

import { roomDetail, roomDetailWithEmptyItems } from "../data/rooms";
import { isRequestAuthorized } from "../utils";
import {
  badRequestMockResponse,
  serverErrorMockResponse,
  unauthorizedMockResponse,
} from "./commonResponse";

const url = import.meta.env.VITE_API_URL;

type MockApis = {
  createRoom: HttpHandler;
  fetchRoom: HttpHandler;
  updateRoom: HttpHandler;
  deleteRoom: HttpHandler;
};

export const roomMockApis: MockApis = {
  createRoom: http.post<PathParams, RoomCreateForm>(
    `${url}/rooms/create`,
    async ({ request }) => {
      const isAuthorized = isRequestAuthorized(request);
      if (!isAuthorized) {
        return unauthorizedMockResponse;
      }

      const { title } = await request.json();

      if (!title) {
        return badRequestMockResponse;
      }

      const data: RoomCreateResponse = {
        roomId: uuidv4(),
      };
      return HttpResponse.json(data);
    }
  ),
  fetchRoom: http.get(`${url}/rooms/:id`, ({ request, params }) => {
    const isAuthorized = isRequestAuthorized(request);
    if (!isAuthorized) {
      return unauthorizedMockResponse;
    }

    const roomId = params.id;

    if (!roomId) {
      return badRequestMockResponse;
    }

    return HttpResponse.json(roomDetail, { status: HttpStatusCode.Ok });
  }),
  updateRoom: http.put<PathParams, RoomForm>(
    `${url}/rooms/:id`,
    async ({ params, request }) => {
      const isAuthorized = isRequestAuthorized(request);
      if (!isAuthorized) {
        return unauthorizedMockResponse;
      }

      try {
        const roomId = params.id;

        if (!roomId) {
          return badRequestMockResponse;
        }

        const body = await request.json();

        const data: RoomDetailResponse = {
          ...roomDetail,
          ...body,
        };

        return HttpResponse.json(data);
      } catch (err) {
        return serverErrorMockResponse;
      }
    }
  ),
  deleteRoom: http.delete(`${url}/rooms/:id`, ({ params, request }) => {
    const isAuthorized = isRequestAuthorized(request);
    if (!isAuthorized) {
      return unauthorizedMockResponse;
    }

    const roomId = params.id;

    if (!roomId) {
      return badRequestMockResponse;
    }

    return HttpResponse.json(undefined);
  }),
};

type CustomMockApis = {
  fetchRoomWithNoData: HttpHandler;
};

export const roomCustomMockApis: CustomMockApis = {
  fetchRoomWithNoData: http.get(`${url}/rooms/:id`, ({ request, params }) => {
    const isAuthorized = isRequestAuthorized(request);
    if (!isAuthorized) {
      return unauthorizedMockResponse;
    }

    const roomId = params.id;

    if (!roomId) {
      return badRequestMockResponse;
    }

    return HttpResponse.json(roomDetailWithEmptyItems, {
      status: HttpStatusCode.Ok,
    });
  }),
};
