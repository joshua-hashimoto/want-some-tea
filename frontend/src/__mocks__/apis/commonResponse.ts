import { HttpStatusCode } from "axios";
import { HttpResponse } from "msw";

import { badRequestResponse, unauthorizedRequest } from "../data/error";

export const badRequestMockResponse = HttpResponse.json(badRequestResponse, {
  status: HttpStatusCode.BadRequest,
});

export const unauthoziedMockResponse = HttpResponse.json(unauthorizedRequest, {
  status: HttpStatusCode.Unauthorized,
});
