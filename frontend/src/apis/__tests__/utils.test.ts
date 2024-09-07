import { v4 as uuidv4 } from "uuid";

import { clearAuthorizationHeader, setAuthorizationHeader } from "../utils";

import { client } from "..";

describe("api utils", () => {
  afterEach(() => {
    delete client.defaults.headers.common["Authorization"];
  });

  test("setAuthorizationHeader", () => {
    const token = uuidv4();
    setAuthorizationHeader(token);
    expect(client.defaults.headers.common["Authorization"]).toBe(
      `Bearer ${token}`
    );
  });

  test("clearAuthorizationHeader", () => {
    const token = uuidv4();
    client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    clearAuthorizationHeader();
    expect(client.defaults.headers.common["Authorization"]).toBeFalsy();
  });
});
