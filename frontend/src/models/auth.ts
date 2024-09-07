export type SignInForm = {
  username: string; // NOTE: OAuth2の仕様に合わせるため、プロパティ名はusernameにしている。実際にセットされるのはメールアドレス
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
