import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useSetRecoilState } from "recoil";

import { authApi, client } from "~/apis";
import { ErrorResponse } from "~/models";
import { SignInForm, SignInResponse, SignUpForm } from "~/models/auth";
import { accessTokenAtom } from "~/store/auth";

type UseSignUpMutation = UseMutationResult<
  AxiosResponse<SignInResponse>,
  AxiosError<ErrorResponse>,
  SignUpForm,
  unknown
>;

export const useSignUpMutation = (): UseSignUpMutation => {
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  return useMutation({
    mutationFn: authApi.signUp,
    onSuccess: (result) => {
      const data = result.data;
      setAccessToken(data.accessToken);
    },
  });
};

type UseSignInMutation = UseMutationResult<
  AxiosResponse<SignInResponse>,
  AxiosError<ErrorResponse>,
  SignInForm,
  unknown
>;

export const useSignInMutation = (): UseSignInMutation => {
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  return useMutation({
    mutationFn: authApi.signIn,
    onSuccess: (result) => {
      const data = result.data;
      setAccessToken(data.accessToken);
    },
  });
};

type UseSignOutMutation = UseMutationResult<
  AxiosResponse<void>,
  AxiosError<ErrorResponse>,
  unknown,
  unknown
>;

export const useSignOutMutation = (): UseSignOutMutation =>
  useMutation({
    mutationFn: authApi.signOut,
    onSuccess: () => {
      delete client.defaults.headers.common["Authorization"];
    },
  });
