import { MemoryRouter, MemoryRouterProps } from "react-router-dom";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";

export const mockedQueryCache = new QueryCache();
export const mockedQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const mockedNavigator = vi.fn();

export const renderComponent = (
  ui: React.ReactNode,
  options?: {
    routerOptions?: MemoryRouterProps;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) =>
  render(
    <RecoilRoot>
      <QueryClientProvider client={mockedQueryClient}>
        <MemoryRouter {...options?.routerOptions}>{ui}</MemoryRouter>
      </QueryClientProvider>
    </RecoilRoot>
  );
