import React from "react";
import ReactDOM from "react-dom/client";

import { ConfigProvider } from "antd";

import App from "./App.tsx";
import { antdTheme } from "./utils/theme.ts";

const setup = async (): Promise<void> => {
  const isDevMode = import.meta.env.DEV;
  if (isDevMode) {
    const { mockWorker } = await import("./__mocks__/apis/worker.ts");
    mockWorker.start({
      onUnhandledRequest: "bypass",
    });
  }
};

setup().then(() =>
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ConfigProvider theme={antdTheme}>
        <App />
      </ConfigProvider>
    </React.StrictMode>
  )
);
