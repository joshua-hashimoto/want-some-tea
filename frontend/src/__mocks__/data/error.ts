import { ErrorResponse } from "~/models/api";

export const badRequestStatus = "E0400";

export const badRequestResponse: ErrorResponse = {
  status: badRequestStatus,
  detail: "request is wrong",
};

export const unauthorizedStatus = "E0401";

export const unauthorizedResponse: ErrorResponse = {
  status: unauthorizedStatus,
  detail: "user is not authorized",
};

export const serverErrorStatus = "E0500";

export const serverErrorResponse: ErrorResponse = {
  status: serverErrorStatus,
  detail: "Something went wrong. Please contact the developer",
};
