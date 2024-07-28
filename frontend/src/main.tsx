import React from "react";
import ReactDOM from "react-dom/client";

import { ConfigProvider } from "antd";
import { RecoilRoot } from "recoil";

import App from "./App.tsx";
import { antdTheme } from "./utils/theme.ts";

const setup = async (): Promise<void> => {
  const isMockMode = import.meta.env.MODE === "mock";
  if (isMockMode) {
    const { mockWorker } = await import("./__mocks__/apis/worker.ts");
    mockWorker.start({
      onUnhandledRequest: "bypass",
    });
  }
};

setup().then(() =>
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <RecoilRoot>
        <ConfigProvider theme={antdTheme}>
          <App />
        </ConfigProvider>
      </RecoilRoot>
    </React.StrictMode>
  )
);
