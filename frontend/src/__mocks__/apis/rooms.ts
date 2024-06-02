import { HttpStatusCode } from "axios";
import { http, HttpHandler, HttpResponse } from "msw";
import { v4 as uuidv4 } from "uuid";

import { PurchaseItem, RoomDetailResponse } from "~/models";

import { badRequestMockResponse } from "./commonResponse";

const url = import.meta.env.VITE_API_URL;

type MockApis = {
  fetchRoom: HttpHandler;
};

export const roomMockAPis: MockApis = {
  fetchRoom: http.get(`${url}/rooms/:id`, ({ params }) => {
    const roomId = params.id;

    if (!roomId) {
      return badRequestMockResponse;
    }

    const items: PurchaseItem[] = [
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
    const data: RoomDetailResponse = {
      id: uuidv4(),
      title: "Mock Room",
      description: "This is a description for the room",
      items,
      closingAt: "2024-12-31",
    };

    return HttpResponse.json(data, { status: HttpStatusCode.Ok });
  }),
};
