import {addFilter} from '@wordpress/hooks';

import './index.scss';

console.log('huhu from theme');

const ALL_CSS_CLASSES = [
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
];

addFilter(
  'gutenberg-customclassname-tag-input-extension-get-configuration',
  'wp-flausen',
  function (configuration, blockName) {
    const items = (() => {
      switch (blockName) {
        case 'core/quote':
          return ALL_CSS_CLASSES.slice(3);
        default:
          return ALL_CSS_CLASSES;
      }
    })();
    return {
      ...configuration,
      items,
      isEnum: true, // prohibit insertion of unknown class names
      // canReorder: false,
    };
  }
);
