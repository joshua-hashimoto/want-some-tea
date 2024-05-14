import path from "path";
import { ConfigEnv, UserConfig, loadConfigFromFile, mergeConfig } from "vite";
import type { StorybookConfig } from "@storybook/react-vite";
import svgrPlugin from "vite-plugin-svgr";

const devConfig: ConfigEnv = {
  mode: "development",
  command: "serve",
  isSsrBuild: false,
};

const prodConfig: ConfigEnv = {
  mode: "production",
  command: "build",
  isSsrBuild: false,
};

const config: StorybookConfig = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "storybook-addon-remix-react-router",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: ["../public"],
  viteFinal: async (config, { configType }) => {
    const isProduction = configType === "PRODUCTION";
    const envConfig = isProduction ? prodConfig : devConfig;
    const userConfigFilePath = path.resolve(__dirname, "../vite.config.ts");
    const loadedConfig = await loadConfigFromFile(
      envConfig,
      userConfigFilePath
    );

    if (!loadedConfig) {
      return config;
    }

    const { config: userConfig } = loadedConfig;
    // Merge custom configuration into the default config
    const viteConfig: UserConfig = {
      ...userConfig,
      server: {
        ...userConfig.server,
        host: false,
        port: 6006,
      },
    };
    return mergeConfig(config, {
      ...viteConfig,
      plugins: [svgrPlugin()],
    });
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
