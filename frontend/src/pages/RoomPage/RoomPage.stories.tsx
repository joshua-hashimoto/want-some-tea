import { Meta, StoryObj } from "@storybook/react";
import { reactRouterParameters } from "storybook-addon-remix-react-router";
import { v4 as uuidv4 } from "uuid";

import { roomCustomMockApis } from "~/__mocks__/apis/rooms";
import { setAuthorizationHeader } from "~/apis/utils";
import { Routes } from "~/routers";

import RoomPage from "./RoomPage";

const meta: Meta<typeof RoomPage> = {
  component: RoomPage,
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { id: uuidv4() },
      },
      routing: { path: `/${Routes.rooms.detail}` },
    }),
  },
  decorators: [
    (Story) => {
      setAuthorizationHeader(uuidv4());
      return Story();
    },
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EmptyItems: Story = {
  parameters: {
    msw: {
      handlers: {
        fetchRoom: roomCustomMockApis.fetchRoomWithNoData,
      },
    },
  },
};
