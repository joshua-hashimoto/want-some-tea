import { RequestHandler } from "msw";

import { setupServer } from "msw/node";

const handlers: RequestHandler[] = [];

export const mockServer = setupServer(...handlers);
