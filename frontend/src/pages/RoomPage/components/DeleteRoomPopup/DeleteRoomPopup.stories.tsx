import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import DeleteRoomPopup from "./DeleteRoomPopup";

const meta: Meta<typeof DeleteRoomPopup> = {
  args: {
    open: true,
    onDelete: fn(),
  },
  component: DeleteRoomPopup,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
