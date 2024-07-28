export type SignInForm = {
  email: string;
  password: string;
};

export type SignInResponse = {
  accessToken: string;
};

export type SignUpForm = {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
};
