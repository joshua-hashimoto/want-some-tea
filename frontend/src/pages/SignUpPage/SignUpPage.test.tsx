import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Routes } from "~/routers";
import { renderComponent } from "~/utils/tests";

import { mockedNavigator } from "../../../vitest.setup";
import SignUpPage from "./SignUpPage";

const email = "example@example.com";
const nickname = "john-doe";
const password = "Abcd1234";

test("display test", () => {
  renderComponent(<SignUpPage />);

  const title = screen.getByText(/^アカウント登録$/);
  expect(title).toBeInTheDocument();

  const emailLabel = screen.getByText(/メールアドレス/);
  expect(emailLabel).toBeInTheDocument();

  const emailInput = screen.getByTestId(/email-input/) as HTMLInputElement;
  expect(emailInput).toBeInTheDocument();
  expect(emailInput).not.toHaveValue();

  const nicknameLabel = screen.getByText(/ニックネーム/);
  expect(nicknameLabel).toBeInTheDocument();

  const nicknameInput = screen.getByTestId(
    /nickname-input/
  ) as HTMLInputElement;
  expect(nicknameInput).toBeInTheDocument();
  expect(nicknameInput).not.toHaveValue();

  const passwordLabel = screen.getByText(/^パスワード$/);
  expect(passwordLabel).toBeInTheDocument();

  const passwordInput = screen.getByTestId(
    /^password-input$/
  ) as HTMLInputElement;
  expect(passwordInput).toBeInTheDocument();
  expect(passwordInput).not.toHaveValue();

  const confirmPasswordLabel = screen.getByText(/パスワード確認/);
  expect(confirmPasswordLabel).toBeInTheDocument();

  const confirmPasswordInput = screen.getByTestId(
    /confirm-password-input/
  ) as HTMLInputElement;
  expect(confirmPasswordInput).toBeInTheDocument();
  expect(confirmPasswordInput).not.toHaveValue();

  const submitButton = screen.getByRole("button", {
    name: /アカウントを登録する/,
  });
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toBeDisabled();
});

test("action test", async () => {
  renderComponent(<SignUpPage />);

  const submitButton = screen.getByRole("button", {
    name: /アカウントを登録する/,
  });
  expect(submitButton).toBeDisabled();

  // NOTE: emailだけの入力で確認
  const emailInput = screen.getByTestId(/email-input/) as HTMLInputElement;
  await userEvent.type(emailInput, email);
  expect(submitButton).toBeDisabled();

  await userEvent.clear(emailInput);

  // NOTE: nicknameだけの入力で確認
  const nicknameInput = screen.getByTestId(
    /nickname-input/
  ) as HTMLInputElement;
  await userEvent.type(nicknameInput, nickname);
  expect(submitButton).toBeDisabled();

  await userEvent.clear(nicknameInput);

  // NOTE: passwordだけの入力で確認
  const passwordInput = screen.getByTestId(
    /^password-input$/
  ) as HTMLInputElement;
  await userEvent.type(passwordInput, password);
  expect(submitButton).toBeDisabled();

  await userEvent.clear(passwordInput);

  // NOTE: passwordだけの入力で確認
  const confirmPasswordInput = screen.getByTestId(
    /confirm-password-input/
  ) as HTMLInputElement;
  await userEvent.type(confirmPasswordInput, password);
  expect(submitButton).toBeDisabled();

  await userEvent.clear(confirmPasswordInput);

  // NOTE: 全部の入力で確認
  await userEvent.type(emailInput, email);
  await userEvent.type(nicknameInput, nickname);
  await userEvent.type(passwordInput, password);
  await userEvent.type(confirmPasswordInput, password);
  expect(submitButton).toBeEnabled();
});

test("navigation test", async () => {
  renderComponent(<SignUpPage />);

  const emailInput = screen.getByTestId(/email-input/) as HTMLInputElement;
  await userEvent.type(emailInput, email);

  const nicknameInput = screen.getByTestId(
    /nickname-input/
  ) as HTMLInputElement;
  await userEvent.type(nicknameInput, nickname);

  const passwordInput = screen.getByTestId(
    /^password-input$/
  ) as HTMLInputElement;
  await userEvent.type(passwordInput, password);

  const confirmPasswordInput = screen.getByTestId(
    /confirm-password-input/
  ) as HTMLInputElement;
  await userEvent.type(confirmPasswordInput, password);

  const submitButton = screen.getByRole("button", {
    name: /アカウントを登録する/,
  });
  await userEvent.click(submitButton);

  expect(mockedNavigator).toHaveBeenCalledWith(Routes.auth.singIn);
});
