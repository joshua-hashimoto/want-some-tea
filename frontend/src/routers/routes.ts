export const Routes = {
  init: "",
  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
  },
  rooms: {
    entry: "/rooms/entry",
    create: "/rooms/create",
    detail: "/rooms/:id",
  },
  error: {
    unauthorized: "/unauthorized",
    notFound: "/not-found",
  },
};
