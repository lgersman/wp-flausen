import {applyFilters} from '@wordpress/hooks';

const NAMESPACE = 'wp-flausen';

const filters = {
  GET_CONFIGURATION:
    'gutenberg-customclassname-tag-input-extension-get-configuration',
  NAMESPACE,
};

const actions = {
  NAMESPACE,
};

export {filters, actions};

export default function getConfiguration(defaultConfiguration, blockName) {
  return applyFilters(
    filters.GET_CONFIGURATION,
    defaultConfiguration,
    blockName
  );
}
