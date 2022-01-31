import React, {useContext, useCallback} from 'react';
import PropTypes from 'prop-types';
import {ACTION_ADD_SELECTED} from '../reducer.js';

import {TagInputContext} from './tag-input.jsx';

function Options({addableItems}) {
  const {state} = useContext(TagInputContext);
  return (
    <>
      {addableItems.map((item) => (
        <option
          key={`item-${item.value || item}`}
          value={state.addableItems.indexOf(item)}
        >
          {item.label || item.value || item}
        </option>
      ))}
    </>
  );
}

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
  Options.propTypes = {
    addableItems: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      })
    ).isRequired,
  };
}

function OptGroups({addableItemsByCategory}) {
  return (
    <>
      <Options addableItems={addableItemsByCategory.get('') ?? []} />
      {[...addableItemsByCategory.entries()].map(
        ([category, addableItems]) =>
          category && (
            <optgroup key={`category-${category}`} label={category}>
              <Options addableItems={addableItems} />
            </optgroup>
          )
      )}
    </>
  );
}

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
  OptGroups.propTypes = {
    addableItemsByCategory: PropTypes.instanceOf(Map).isRequired,
  };
}

function TagInputSelector({disabled, readonly}) {
  const {state, dispatch} = useContext(TagInputContext);

  const getAddableItemsOrderedByCategories = useCallback(() => {
    const addableItemsOrderedByCategory = new Map();

    for (const item of state.addableItems) {
      let items = addableItemsOrderedByCategory.get(item.category);

      if (!items) {
        items = [];
        addableItemsOrderedByCategory.set(item.category || '', items);
      }

      items.push(item);
    }

    return addableItemsOrderedByCategory;
  }, [state.addableItems]);

  const onChange = (event) => {
    if (readonly) {
      return;
    }
    // onBlur will probably set value to "" ...
    if (event.target.value) {
      const index = Number.parseInt(event.target.value);

      dispatch({type: ACTION_ADD_SELECTED, payload: state.addableItems[index]});
    }

    event.target.value = '';
  };

  return (
    <select
      disabled={disabled || !state.addableItems.length}
      className={`components-select-control__input`}
      onChange={onChange}
      onBlur={onChange}
    >
      {!readonly && <option value="">Add ...</option>}
      <OptGroups
        addableItemsByCategory={getAddableItemsOrderedByCategories()}
      />
    </select>
  );
}

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
  TagInputSelector.propTypes = {
    readonly: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
  };
}

export default TagInputSelector;
