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

    console.log({config, configType});
    return config;
  },
};
