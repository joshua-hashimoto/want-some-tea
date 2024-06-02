import React from "react";
import type { Preview, StoryFn } from "@storybook/react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { withRouter } from "storybook-addon-remix-react-router";
import { ConfigProvider } from "antd";
import { RecoilRoot } from "recoil";
import { antdTheme } from "../src/utils/theme";

const queryDecorator = (Story: StoryFn) => {
  const queryCache = new QueryCache({
    onError: (err): void => {
      console.error(err);
    },
  });
  const mutationCache = new MutationCache({
    onError: (err): void => {
      console.error(err);
    },
  });

  const mockedQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
        gcTime: 0,
      },
    },
    queryCache,
    mutationCache,
  });
  return (
    <QueryClientProvider client={mockedQueryClient}>
      <Story />
    </QueryClientProvider>
  );
};

const recoilDecorator = (Story: StoryFn) => {
  return (
    <RecoilRoot>
      <Story />
    </RecoilRoot>
  );
};

const themeDecorator = (Story: StoryFn) => {
  return (
    <ConfigProvider theme={antdTheme}>
      <Story />
    </ConfigProvider>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withRouter, recoilDecorator, themeDecorator, queryDecorator],
};

export default preview;
