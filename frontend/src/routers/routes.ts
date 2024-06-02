export const Routes = {
  public: {
    init: "",
    rooms: {
      entry: "/rooms/entry",
      create: "/rooms/create",
      detail: "/rooms/:id",
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
