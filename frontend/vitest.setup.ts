import { QueryCache } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

import { mockServer } from "~/__mocks__/apis/server";

import "@testing-library/jest-dom/vitest";

// Mock getComputedStyle
Object.defineProperty(window, "getComputedStyle", {
  value: () => ({
    getPropertyValue: () => "",
  }),
});

// NOTE: for testing Antd components
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

export const mockedQueryCache = new QueryCache();
export const mockedQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const mockedNavigator = vi.fn();
vi.mock("react-router-dom", async () => {
  const reactRouter = await vi.importActual("react-router-dom");
  return {
    ...reactRouter,
    useNavigate: () => mockedNavigator,
  };
});

beforeAll(() => {
  mockServer.listen({
    onUnhandledRequest: "error",
  });
});

afterEach(() => {
  mockServer.resetHandlers();
  mockedQueryCache.clear();
  mockedQueryClient.clear();
});

afterAll(() => {
  mockServer.close();
});
