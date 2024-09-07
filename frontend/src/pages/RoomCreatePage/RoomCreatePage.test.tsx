import { renderComponent } from "~/utils/tests";
import RoomCreatePage from "./RoomCreatePage";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("UI test", () => {
  renderComponent(<RoomCreatePage />);

  const title = screen.getByText(/おつかいを作成/);
  expect(title).toBeInTheDocument();

  const titleInput = screen.getByTestId(/title-input/);
  expect(titleInput).toBeInTheDocument();

  const createButton = screen.getByRole("button", { name: /作成する/ });
  expect(createButton).toBeInTheDocument();
});

test("Add button active status", async () => {
  renderComponent(<RoomCreatePage />);

  const button = screen.getByRole("button", { name: /作成する/ });
  expect(button).toBeDisabled();

  const titleInput = screen.getByTestId(/title-input/);
  await userEvent.type(titleInput, "new title");

  expect(screen.getByRole("button", { name: /作成する/ })).toBeEnabled();

  await userEvent.clear(titleInput);

  expect(screen.getByRole("button", { name: /作成する/ })).toBeDisabled();
});
