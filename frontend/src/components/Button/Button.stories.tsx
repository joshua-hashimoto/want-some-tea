import { Meta, StoryObj } from "@storybook/react";

import Button, { ButtonProps } from "./Button";

const meta: Meta<ButtonProps> = {
  component: Button,
  args: {
    type: "primary",
    children: "TEST",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
