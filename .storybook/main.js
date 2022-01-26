module.exports = {
  stories: ['../packages/*/src/stories/*.stories.@(js|mjs|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'storybook-builder-vite',
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config, {configType}) {
    // customize the Vite config here

    // workaround: for whatever reason we need to apply global = window in dev/watch mode
    // to get @wordpress/component running
    if (config.server) {
      // required to fix "global not defined" for a @wordpress/component dependency
      config.define ??= {};
      config.define['global'] = 'window';
    }

    // the generated storybook code should work also fine on destinations with path (like gh pages)
    // https://github.com/eirslett/storybook-builder-vite/issues/96#issuecomment-1016548429
    if (configType === 'PRODUCTION') {
      config = {
        ...config,
        base: './',
      };
    }

    console.log({config, configType});
    return config;
  },
  async webpackFinal(config, {configType}) {
    // config.output.publicPath = '/storybook/';
    return config;
  },
  async managerWebpack(config) {
    // config.output.publicPath = '/storybook/';
    return config;
  },
};
