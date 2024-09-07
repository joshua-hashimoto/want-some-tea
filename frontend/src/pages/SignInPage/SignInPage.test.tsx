import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Routes } from "~/routers";
import { mockedNavigator, renderComponent } from "~/utils/tests";

import SignInPage from "./SignInPage";

const email = "example@example.com";
const password = "Abcd1234";

test("display test", () => {
  renderComponent(<SignInPage />);

  const title = screen.getByText(/^ログイン$/);
  expect(title).toBeInTheDocument();

  const emailLabel = screen.getByText(/メールアドレス/);
  expect(emailLabel).toBeInTheDocument();

  const emailInput = screen.getByTestId(/email-input/) as HTMLInputElement;
  expect(emailInput).toBeInTheDocument();
  expect(emailInput).not.toHaveValue();

  const passwordLabel = screen.getByText(/パスワード/);
  expect(passwordLabel).toBeInTheDocument();

  const passwordInput = screen.getByTestId(
    /password-input/
  ) as HTMLInputElement;
  expect(passwordInput).toBeInTheDocument();
  expect(passwordInput).not.toHaveValue();

  const submitButton = screen.getByRole("button", { name: /ログインする/ });
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toBeDisabled();
});

test("action test", async () => {
  renderComponent(<SignInPage />);

  const submitButton = screen.getByRole("button", { name: /ログインする/ });
  expect(submitButton).toBeDisabled();

  // NOTE: emailだけの入力で確認
  const emailInput = screen.getByTestId(/email-input/) as HTMLInputElement;
  await userEvent.type(emailInput, email);
  expect(submitButton).toBeDisabled();

  await userEvent.clear(emailInput);

  // NOTE: passwordだけの入力で確認
  const passwordInput = screen.getByTestId(
    /password-input/
  ) as HTMLInputElement;
  await userEvent.type(passwordInput, password);
  expect(submitButton).toBeDisabled();

  await userEvent.clear(passwordInput);

  // NOTE: 両方の入力で確認
  await userEvent.type(emailInput, email);
  await userEvent.type(passwordInput, password);
  expect(submitButton).toBeEnabled();
});

test("navigation test", async () => {
  renderComponent(<SignInPage />);

  const emailInput = screen.getByTestId(/email-input/) as HTMLInputElement;
  await userEvent.type(emailInput, email);
  const passwordInput = screen.getByTestId(
    /password-input/
  ) as HTMLInputElement;
  await userEvent.type(passwordInput, password);
  const submitButton = screen.getByRole("button", { name: /ログインする/ });
  await userEvent.click(submitButton);

  expect(mockedNavigator).toHaveBeenCalledWith(Routes.rooms.entry);
});
