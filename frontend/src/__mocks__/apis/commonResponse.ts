import { HttpStatusCode } from "axios";
import { HttpResponse } from "msw";

import { badRequestResponse, unauthorizedResponse } from "../data/error";

export const badRequestMockResponse = HttpResponse.json(badRequestResponse, {
  status: HttpStatusCode.BadRequest,
});

export const unauthorizedMockResponse = HttpResponse.json(
  unauthorizedResponse,
  {
    status: HttpStatusCode.Unauthorized,
  }
);

export const serverErrorMockResponse = HttpResponse.json();
