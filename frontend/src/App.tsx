import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router-dom";

import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import dayjs from "dayjs";

import "dayjs/locale/ja";
import UnexpectedErrorPage from "./pages/UnexpectedErrorPage";
import { router } from "./routers";

dayjs.locale("ja");

type Props = Record<string, unknown>;

const App: React.FC<Props> = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} fallback={<UnexpectedErrorPage />}>
            <Suspense fallback={null}>
              <RouterProvider router={router} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  );
};
export default App;
