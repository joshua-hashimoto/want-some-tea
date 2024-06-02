import { ErrorResponse } from "~/models/api";

export const badRequestStatus = "E0400";

export const badRequestResponse: ErrorResponse = {
  status: badRequestStatus,
  detail: "request is wrong",
};

export const unauthorizedStatus = "E0401";

export const unauthorizedRequest: ErrorResponse = {
  status: unauthorizedStatus,
  detail: "user is not authorized",
};
