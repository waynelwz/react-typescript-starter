const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "storybook-builder-vite"
  },
  viteFinal: async (config, {configType}) => {
    const customConfig = {
      resolve: {
        alias: {
          '@': path.resolve('src'),
          '@assets': path.resolve('src/assets'),
        },
      },
      // esbuild: {
      //   jsxInject: `import React from 'react'`,
      // },
    }

    return {...customConfig};
  },
}