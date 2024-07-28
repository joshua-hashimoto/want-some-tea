import { RequestHandler } from "msw";

import { authMockApis } from "./auth";
import { roomMockApis } from "./rooms";

export const handlers: RequestHandler[] = [
  ...Object.values(authMockApis),
  ...Object.values(roomMockApis),
];

export const storybookHandlers = {
  ...authMockApis,
  ...roomMockApis,
};
