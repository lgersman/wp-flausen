import {removeFilter, addFilter} from '@wordpress/hooks';
import {__} from '@wordpress/i18n';
import {hasBlockSupport} from '@wordpress/blocks';
import {createHigherOrderComponent} from '@wordpress/compose';
import {InspectorControls} from '@wordpress/block-editor';
import domReady from '@wordpress/dom-ready';
import TagInput from '@wp-flausen/react-tag-input';
import React from 'react';
import getConfiguration, {filters, actions} from './wp-hooks-filter.js';

//import './../node_modules/@wp-flausen/react-tag-input/src/index.scss';

export {filters, actions};

import './index.scss';

console.log(__('huhu !'));

let configuration = {
  items: [],
  isEnum: false,
  canReorder: true,
};

domReady(() => {
  configuration = getConfiguration(configuration);
  console.log('filtered configuration=', configuration);
});

removeFilter(
  'editor.BlockEdit',
  'core/editor/custom-class-name/with-inspector-control'
);

// @TODO: render unknown tags striked out
function renderTag({item, children}) {
  const {description = '', category = ''} = item;

  return (
    <div
      style={{
        padding: '2px',
        borderRadius: '4px',
      }}
      className={
        'gutenberg-customclassname-tag-input-extension-tag-category__' +
        category.replace(/\s+/g, '-').toLowerCase()
      }
      title={
        (category ? `${category} /` : '') + `${item.label}\n\n${description}`
      }
    >
      <span style={{padding: '0 6px 0 6px'}}>
        {category ? `${category} /` : ''}
        {item.label}
      </span>
      {children}
    </div>
  );
}

addFilter(
  'editor.BlockEdit',
  'wp-flausen/gutenberg-customclassname-tag-input-extension/with-inspector-control',
  createHigherOrderComponent((BlockEdit) => {
    /* eslint react/prop-types: 0 */
    // eslint-disable-next-line react/display-name
    return (props) => {
      const hasCustomClassName = hasBlockSupport(
        props.name,
        'customClassName',
        true
      );
      if (hasCustomClassName && props.isSelected) {
        const {items = [], isEnum = false, canReorder = true} = configuration;

        let selected = props.attributes.className
          ? props.attributes.className.split(' ')
          : [];

        selected = items.map((item) => {
          if (selected.includes(item.value)) {
            return item;
          }
        });

        selected = selected.filter(Boolean);

        return (
          <>
            <BlockEdit {...props} />
            <InspectorControls __experimentalGroup="advanced">
              <label
                className="components-input-control__label"
                htmlFor={`${TagInput.className}-editor-cssclass_editor`}
              >
                {__('Additional CSS class(es)')}
              </label>
              <TagInput
                id="cssclass_editor"
                isEnum={isEnum}
                items={items}
                canReorder={canReorder}
                selected={selected}
                onChange={(selected) => {
                  const nextValue = selected.map((_) => _.value || _).join(' ');
                  props.setAttributes({
                    className: nextValue !== '' ? nextValue : undefined,
                  });
                }}
                renderTag={renderTag}
              />
            </InspectorControls>
          </>
        );
      }

      return <BlockEdit {...props} />;
    };
  }, 'withInspectorControl')
);
