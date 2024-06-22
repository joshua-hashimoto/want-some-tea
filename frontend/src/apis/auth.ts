import { AxiosInstance, AxiosResponse } from "axios";

import { SignInForm, SignInResponse, SignUpForm } from "~/models/auth";

type AuthEndpoints = {
  signUp: (postData: SignUpForm) => Promise<AxiosResponse<SignInResponse>>;
  signIn: (postData: SignInForm) => Promise<AxiosResponse<SignInResponse>>;
  signOut: () => Promise<AxiosResponse<void>>;
};

export const authEndpoints = (client: AxiosInstance): AuthEndpoints => ({
  signUp: (postData: SignUpForm) => {
    const url = "auth/sign-up";
    return client.post(url, postData);
  },
  signIn: (postData: SignInForm) => {
    const url = "auth/sign-in";
    return client.post(url, postData);
  },
  signOut: () => {
    const url = "auth/sign-out";
    return client.post(url);
  },
});
