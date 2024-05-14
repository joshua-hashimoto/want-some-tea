import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Routes } from "~/routers";

import { mockedNavigator } from "../../../vitest.setup";
import NotFoundPage from "./NotFoundPage";
import * as NotFoundPageStories from "./NotFoundPage.stories";

const { Default } = composeStories(NotFoundPageStories);

// NOTE: 表示テストはStorybookに任せる
describe("storybook test", () => {
  test("Default", async () => {
    const { container } = render(<Default />);

    // NOTE: to load MSW properly
    await Default.load();
    await Default.play!({
      canvasElement: container,
    });
  });
});

// NOTE: アクションテストはVitestに任せる
describe("vitest test", () => {
  test("to top navigation", async () => {
    render(<NotFoundPage />);

    const button = await screen.findByRole("button", { name: /TOPに戻る/ });
    await userEvent.click(button);

    expect(mockedNavigator).toBeCalledWith(Routes.public.room.create);
  });
});
