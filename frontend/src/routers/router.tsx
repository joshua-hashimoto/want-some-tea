import { lazy } from "react";
import {
  createBrowserRouter,
  createMemoryRouter,
  Navigate,
  RouteObject,
} from "react-router-dom";

import ErrorRoute from "~/components/ErrorRoute";
import ProtectedRoute from "~/components/ProtectedRoute";
import PublicRoute from "~/components/PublicRoute";

import { Routes } from "./routes";

const NotFoundPage = lazy(() => import("~/pages/NotFoundPage"));
const UnauthorizedPage = lazy(() => import("~/pages/UnauthorizedPage"));
const ExamplePage = lazy(() => import("~/pages/ExamplePage"));

export const routes: RouteObject[] = [
  {
    element: <PublicRoute />,
    children: [
      {
        path: Routes.public.init,
        element: <ExamplePage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [],
  },
  {
    element: <ErrorRoute />,
    children: [
      {
        path: Routes.error.notFound,
        element: <NotFoundPage />,
      },
      {
        path: Routes.error.unauthorized,
        element: <UnauthorizedPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={Routes.error.notFound} />,
  },
];

export const router = createBrowserRouter(routes);

export const memoryRouter = createMemoryRouter(routes);
