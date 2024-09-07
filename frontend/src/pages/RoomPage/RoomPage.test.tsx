import { Route, Routes as ReactRouterRoutes } from "react-router-dom";

import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { v4 as uuidv4 } from "uuid";

import { setAuthorizationHeader } from "~/apis/utils";
import { Routes } from "~/routers";
import { renderComponent } from "~/utils/tests";

import RoomPage from "./RoomPage";
import { roomDetail } from "~/__mocks__/data/rooms";
import userEvent from "@testing-library/user-event";

beforeAll(() => {
  setAuthorizationHeader(uuidv4());
});

test("display test", async () => {
  const { container } = renderComponent(
    <ReactRouterRoutes>
      <Route path={Routes.rooms.detail} element={<RoomPage />} />
    </ReactRouterRoutes>,
    {
      routerOptions: {
        initialEntries: [`/rooms/${uuidv4()}`],
      },
    }
  );

  // NOTE: ローディングが終わるのを待つ
  await waitForElementToBeRemoved(() =>
    container.querySelector(".ant-spin-spinning")
  );

  const idInput = screen.getByTestId(/room-id/) as HTMLInputElement;
  expect(idInput).toBeInTheDocument();
  expect(idInput.value).toBe(roomDetail.id);

  const deleteButton = screen.getByTestId(/room-delete-button/);
  expect(deleteButton).toBeInTheDocument();

  const titleInput = screen.getByTestId(/title/) as HTMLInputElement;
  expect(titleInput).toBeInTheDocument();
  expect(titleInput.value).toBe(roomDetail.title);

  const purchaseItems = screen.getAllByTestId(/purchase-item-form-item/);
  expect(purchaseItems.length).toBe(roomDetail.items.length);

  const addButton = screen.getByRole("button", { name: /追加/ });
  expect(addButton).toBeInTheDocument();
});

test("can edit title", async () => {
  const { container } = renderComponent(
    <ReactRouterRoutes>
      <Route path={Routes.rooms.detail} element={<RoomPage />} />
    </ReactRouterRoutes>,
    {
      routerOptions: {
        initialEntries: [`/rooms/${uuidv4()}`],
      },
    }
  );

  // NOTE: ローディングが終わるのを待つ
  await waitForElementToBeRemoved(() =>
    container.querySelector(".ant-spin-spinning")
  );

  const titleInput = screen.getByTestId(/title/) as HTMLInputElement;

  await userEvent.type(titleInput, "edit");
  expect(titleInput).toHaveValue(roomDetail.title + "edit");

  await userEvent.clear(titleInput);
  await userEvent.type(titleInput, "new title");
  expect(titleInput).toHaveValue("new title");
});

test("add button can add items", async () => {
  const { container } = renderComponent(
    <ReactRouterRoutes>
      <Route path={Routes.rooms.detail} element={<RoomPage />} />
    </ReactRouterRoutes>,
    {
      routerOptions: {
        initialEntries: [`/rooms/${uuidv4()}`],
      },
    }
  );

  // NOTE: ローディングが終わるのを待つ
  await waitForElementToBeRemoved(() =>
    container.querySelector(".ant-spin-spinning")
  );

  const purchaseItems = screen.getAllByTestId(/purchase-item-form-item/);
  expect(purchaseItems.length).toBe(roomDetail.items.length);

  const addButton = screen.getByRole("button", { name: /追加/ });
  expect(addButton).toBeInTheDocument();

  await userEvent.click(addButton);

  const updatedPurchaseItems = screen.getAllByTestId(/purchase-item-form-item/);
  expect(updatedPurchaseItems.length).toBe(roomDetail.items.length + 1);

  // NOTE: ボタンが消えていないことを確認
  expect(addButton).toBeInTheDocument();
});
