import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import type {StorybookConfig} from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/lib/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: ['@nx/react/plugins/storybook'],
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },
  webpackFinal: async (webpackConfig: any) => {
    const cssRule = webpackConfig.module?.rules.find(
      (r: any) =>
        r.test && r.test.toString().includes('css') && r.use
    );
    if (cssRule) {
      cssRule.use = [
        {loader: 'style-loader'},
        {loader: 'css-loader'},
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [require('tailwindcss'), require('autoprefixer')],
            },
          },
        },
      ];
    }

    return webpackConfig;
  },
};

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
