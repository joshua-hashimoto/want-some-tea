export const Routes = {
  public: {
    init: "",
    room: {
      create: "/room/create",
      detail: "/room/:id",
    },
  },
  protected: {
    account: "/account",
  },
  error: {
    unauthorized: "/unauthorized",
    notFound: "/not-found",
  },
};
