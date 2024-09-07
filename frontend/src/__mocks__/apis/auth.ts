import { http, HttpHandler, HttpResponse, PathParams } from "msw";

import { SignInForm, SignUpForm } from "~/models/auth";

import { signInResponse } from "../data/auth";
import { badRequestMockResponse } from "./commonResponse";

const url = import.meta.env.VITE_API_URL;

type MockApis = {
  signUp: HttpHandler;
  signIn: HttpHandler;
  signOut: HttpHandler;
};

export const authMockApis: MockApis = {
  signUp: http.post<PathParams, SignUpForm>(
    `${url}/auth/sign-up`,
    async ({ request }) => {
      try {
        const { email, nickname, password, confirmPassword } =
          await request.json();
        const isDataMissing =
          !email || !nickname || !password || !confirmPassword;
        if (isDataMissing) {
          return badRequestMockResponse;
        }
        const isNotSamePassword = password !== confirmPassword;
        if (isNotSamePassword) {
          return badRequestMockResponse;
        }
        return HttpResponse.json(signInResponse);
      } catch (err) {
        return badRequestMockResponse;
      }
    }
  ),
  signIn: http.post<PathParams, SignInForm>(
    `${url}/auth/sign-in`,
    async ({ request }) => {
      try {
        const { username: email, password } = await request.json();
        const isDataMissing = !email || !password;
        if (isDataMissing) {
          return badRequestMockResponse;
        }
        return HttpResponse.json(signInResponse);
      } catch (err) {
        return badRequestMockResponse;
      }
    }
  ),
  signOut: http.post(`${url}/auth/sign-out`, () => HttpResponse.json()),
};
