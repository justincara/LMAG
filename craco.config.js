/** @format */

const CracoLessPlugin = require("craco-less");
const path = require("path");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@layout-body-background":
                "linear-gradient(180deg, #0C2232 0%, rgba(12, 34, 50, 0.95) 100%)",
              "@primary-color": "#1E2144",
              "@layout-header-background":
                "linear-gradient(269.86deg, #192735 0%, #0F1B27 100%)",
              "@label-color": "#7292AF",
              "@input-bg": "inherit",
              "@input-border-color": "rgba(114, 146, 175, 0.3)",
              "@form-item-label-font-size": "font-size: 16px;",
              "@input-color": "#7292AF",
              "@input-icon-color": "#7292AF",
              // "@input-height-lg": "64px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Disable source map generation
      webpackConfig.devtool = false;

      // Resolve fallback modules
      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        fallback: {
          ...webpackConfig.resolve.fallback,
          crypto: require.resolve("crypto-browserify"),
          stream: require.resolve("stream-browserify"),
          http: require.resolve("stream-http"),
          https: require.resolve("https-browserify"),
          zlib: require.resolve("browserify-zlib"),
          url: require.resolve("url/"),
          path: require.resolve("path-browserify"),
          buffer: require.resolve("buffer"),
        },
      };

      return webpackConfig;
    },
  },
};

// modifyVars color variable guide
// https://github.com/ant-design/ant-design/blob/4.x-stable/components/style/themes/default.less
