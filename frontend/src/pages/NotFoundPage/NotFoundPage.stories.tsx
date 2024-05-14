import { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";

import NotFoundPage from "./NotFoundPage";

const meta: Meta<typeof NotFoundPage> = {
  component: NotFoundPage,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const status = await canvas.findByText(/見つかりませんでした/);
    expect(status).toBeInTheDocument();

    const subtext = await canvas.findByText(/ページは存在しないようです/);
    expect(subtext).toBeInTheDocument();

    const button = await canvas.findByRole("button", { name: /TOPに戻る/ });
    expect(button).toBeInTheDocument();
  },
};
