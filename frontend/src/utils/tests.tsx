import { MemoryRouter, MemoryRouterProps } from "react-router-dom";

import { QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";

import { mockedQueryClient } from "../../vitest.setup";

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
