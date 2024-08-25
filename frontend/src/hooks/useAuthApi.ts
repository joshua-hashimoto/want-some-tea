import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useSetRecoilState } from "recoil";

import { authApi } from "~/apis";
import { ErrorResponse } from "~/models";
import { SignInForm, SignInResponse, SignUpForm } from "~/models/auth";
import { isLoggedInAtom } from "~/store/auth";

type UseSignUpMutation = UseMutationResult<
  AxiosResponse<SignInResponse>,
  AxiosError<ErrorResponse>,
  SignUpForm,
  unknown
>;

export const useSignUpMutation = (): UseSignUpMutation =>
  useMutation({
    mutationFn: authApi.signUp,
  });

type UseSignInMutation = UseMutationResult<
  AxiosResponse<SignInResponse>,
  AxiosError<ErrorResponse>,
  SignInForm,
  unknown
>;

export const useSignInMutation = (): UseSignInMutation => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);

  return useMutation({
    mutationFn: authApi.signIn,
    onSuccess: (_) => {
      setIsLoggedIn(true);
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
      localStorage.clear();
      sessionStorage.clear();
    },
  });
