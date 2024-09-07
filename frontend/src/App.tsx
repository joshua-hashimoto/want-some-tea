import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router-dom";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { AxiosError, HttpStatusCode, isAxiosError } from "axios";
import dayjs from "dayjs";

import "dayjs/locale/ja";
import UnexpectedErrorPage from "./pages/UnexpectedErrorPage";
import { router, Routes } from "./routers";

dayjs.locale("ja");

type Props = Record<string, unknown>;

const App: React.FC<Props> = () => {
  const queryCache = new QueryCache({
    onError: (error) => {
      if (!isAxiosError(error)) {
        return;
      }
      const axiosError: AxiosError = error;
      const statusCode = axiosError.response?.status;
      const isUnauthorizedStatus = statusCode === HttpStatusCode.Unauthorized;
      const isServerErrorStatus =
        statusCode === HttpStatusCode.InternalServerError;
      if (isUnauthorizedStatus || isServerErrorStatus) {
        window.location.replace(
          `${window.location.origin}/${Routes.auth.signIn}`
        );
      }
    },
  });
  const mutationCache = new MutationCache({
    onError: (error) => {
      if (!isAxiosError(error)) {
        return;
      }
      const axiosError: AxiosError = error;
      const statusCode = axiosError.response?.status;
      const isUnauthorizedStatus = statusCode === HttpStatusCode.Unauthorized;
      const isServerErrorStatus =
        statusCode === HttpStatusCode.InternalServerError;
      if (isUnauthorizedStatus || isServerErrorStatus) {
        window.location.replace(
          `${window.location.origin}/${Routes.auth.signIn}`
        );
      }
    },
  });
  const queryClient = new QueryClient({
    queryCache,
    mutationCache,
  });

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
