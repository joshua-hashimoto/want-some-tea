import { Meta, StoryObj } from "@storybook/react";

import RoomEntryPage from "./RoomEntryPage";

const meta: Meta<typeof RoomEntryPage> = {
  component: RoomEntryPage,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
