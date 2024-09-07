import { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";

import UnauthorizedPage from "./UnauthorizedPage";

const meta: Meta<typeof UnauthorizedPage> = {
  component: UnauthorizedPage,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const status = await canvas.findByText(/認証されていません/);
    expect(status).toBeInTheDocument();

    const subtext = await canvas.findByText(/ログインしてください/);
    expect(subtext).toBeInTheDocument();

    const button = await canvas.findByRole("button", { name: /TOPに戻る/ });
    expect(button).toBeInTheDocument();
  },
};
