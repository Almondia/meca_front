const path = require('path');
const webpack = require('webpack');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
module.exports = {
  stories: ['../src/stories/**/*.stories.mdx', '../src/stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-next-router',
  ],
  babel: async (options) => ({
    ...options,
    plugins: ['babel-plugin-styled-components'],
  }),
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/mock': path.resolve(__dirname, '../__tests__/__mocks__/msw'),
    };
    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      }),
    ];
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /imageApi\.ts$/,
        path.join(__dirname, '../__tests__/__mocks__/module/imageApi.js'),
      ),
    );
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /baseAxios\.ts$/,
        path.join(__dirname, '../__tests__/__mocks__/module/axios.js'),
      ),
    );
    const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      enforce: 'pre',
      use: ['@svgr/webpack'],
    });
    return config;
  },
};
