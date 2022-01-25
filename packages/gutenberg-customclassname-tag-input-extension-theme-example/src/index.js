import {addFilter} from '@wordpress/hooks';

import './index.scss';

console.log('huhu from theme');

addFilter(
  'gutenberg-customclassname-tag-input-extension-get-configuration',
  'wp-flausen',
  function (configuration) {
    return {
      ...configuration,
      items: [
        {
          label: `Funky effect`,
          value: 'theme-custom-effect-funky',
          description: 'Makes the block appear funky.',
        },
        {
          label: `Thick`,
          category: `Text`,
          value: 'theme-custom-text-thick',
          description: 'Makes the block font thick.',
        },
        {
          label: `Thin`,
          category: `Text`,
          value: 'theme-custom-text-thin',
          description: 'Makes the block font thin.',
        },
        {
          label: `Small`,
          category: `Spacing`,
          value: 'theme-custom-spacing-small',
          description: 'Gives the block a small spacing.',
        },
        {
          label: `Medium`,
          category: `Spacing`,
          value: 'theme-custom-spacing-medium',
          description: 'Gives the block a medium spacing.',
        },
        {
          label: `Large`,
          category: `Spacing`,
          value: 'theme-custom-spacing-large',
          description: 'Gives the block a large spacing.',
        },
        {
          label: `Dark`,
          category: `Background`,
          value: 'theme-custom-background-dark',
          description: 'Gives the block a dark background.',
        },
        {
          label: `Bright`,
          category: `Background`,
          value: 'theme-custom-background-bright',
          description: 'Gives the block a bright background.',
        },
        {
          label: `Dark`,
          category: `Foreground`,
          value: 'theme-custom-foreground-dark',
          description: 'Gives the block a dark text color.',
        },
        {
          label: `Bright`,
          category: `Foreground`,
          value: 'theme-custom-foreground-bright',
          description: 'Gives the block a bright text color.',
        },
      ],
      isEnum: true,
      // canReorder: false,
    };
  }
);
