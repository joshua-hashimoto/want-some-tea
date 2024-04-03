import React from "react";
import ReactDOM from "react-dom/client";

import { ConfigProvider } from "antd";

import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
