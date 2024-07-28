import { Meta, StoryObj } from "@storybook/react";

import RoomCreatePage from "./RoomCreatePage";

const meta: Meta<typeof RoomCreatePage> = {
  component: RoomCreatePage,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
