import { RequestHandler } from "msw";

import { setupWorker } from "msw/browser";

const handlers: RequestHandler[] = [];

export const mockWorker = setupWorker(...handlers);
