import { RequestHandler } from "msw";

import { roomMockAPis } from "./rooms";

export const handlers: RequestHandler[] = [...Object.values(roomMockAPis)];
