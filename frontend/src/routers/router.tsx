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
const SignInPage = lazy(() => import("~/pages/SignInPage"));
const SignUpPage = lazy(() => import("~/pages/SignUpPage"));
const RoomEntryPage = lazy(() => import("~/pages/RoomEntryPage"));
const RoomCreatePage = lazy(() => import("~/pages/RoomCreatePage"));
const RoomPage = lazy(() => import("~/pages/RoomPage"));

export const routes: RouteObject[] = [
  {
    element: <PublicRoute />,
    children: [
      {
        path: Routes.auth.signIn,
        element: <SignInPage />,
      },
      {
        path: Routes.auth.signUp,
        element: <SignUpPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: Routes.rooms.entry,
        element: <RoomEntryPage />,
      },
      {
        path: Routes.rooms.create,
        element: <RoomCreatePage />,
      },
      {
        path: Routes.rooms.detail,
        element: <RoomPage />,
      },
    ],
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
    element: <Navigate to={Routes.auth.signIn} />,
  },
];

export const router = createBrowserRouter(routes);

export const memoryRouter = createMemoryRouter(routes);
