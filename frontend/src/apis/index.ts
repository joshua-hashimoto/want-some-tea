import axios, { CreateAxiosDefaults } from "axios";

import { authEndpoints } from "./auth";
import { roomsEndpoints } from "./rooms";

const clientConfig: CreateAxiosDefaults = {
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
};

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  ...clientConfig,
});

export const roomsApi = roomsEndpoints(client);
export const authApi = authEndpoints(client);
