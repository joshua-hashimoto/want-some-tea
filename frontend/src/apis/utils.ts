import { client } from ".";

export const setAuthorizationHeader = (token: string): void => {
  client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearAuthorizationHeader = (): void => {
  delete client.defaults.headers.common["Authorization"];
};
