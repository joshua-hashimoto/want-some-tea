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
    const formData = new FormData();
    formData.append("username", postData.username);
    formData.append("password", postData.password);
    formData.append("grant_type", "password");
    return client.post(url, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  signOut: () => {
    const url = "auth/sign-out";
    return client.post(url);
  },
});
