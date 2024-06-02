import { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";

import UnexpectedErrorPage from "./UnexpectedErrorPage";

const meta: Meta<typeof UnexpectedErrorPage> = {
  component: UnexpectedErrorPage,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const title = await canvas.findByText(/500/);
    expect(title).toBeInTheDocument();

    const subtitle = await canvas.findByText(/Sorry, something went wrong./);
    expect(subtitle).toBeInTheDocument();

    const button = await canvas.findByRole("button", { name: /TOPに戻る/ });
    expect(button).toBeInTheDocument();
  },
};
