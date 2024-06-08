import { Meta, StoryObj } from "@storybook/react";

import RoomPage from "./RoomPage";

const meta: Meta<typeof RoomPage> = {
  component: RoomPage,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
