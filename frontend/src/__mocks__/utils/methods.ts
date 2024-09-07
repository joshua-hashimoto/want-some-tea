import { DefaultBodyType, StrictRequest } from "msw";

export const isRequestAuthorized = <T extends DefaultBodyType>(
  request: StrictRequest<T>
): boolean => {
  const isAuthorized = request.headers.get("Authorization");
  return !!isAuthorized;
};
