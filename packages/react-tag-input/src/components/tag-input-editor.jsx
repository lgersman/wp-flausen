import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import TagInput, {TagInputContext} from './tag-input.jsx';
import {ACTION_ADD_SELECTED} from '../reducer.js';

const TagInputEditor = ({instanceId, readonly, disabled}) => {
  const {state, dispatch} = useContext(TagInputContext);

  const ID = `${TagInput.className}-editor-${instanceId}`;

  const onKeyUp = (event) => {
    //event.target.setCustomValidity(null);
    if (event.target.value.trim()) {
      if (event.key === 'Enter') {
        const value = event.target.value.trim();

        const matchedAddableItem = state.addableItems.find(
          (_) => _.value === value || _ === value
        );

        dispatch({
          type: ACTION_ADD_SELECTED,
          payload:
            matchedAddableItem !== undefined ? matchedAddableItem : value,
        });

        event.target.value = '';
      }
    } else if (event.target.value.length) {
      //event.target.setCustomValidity('Cannot add empty tag');
      //event.target.reportValidity();
    }
  };

  return (
    <>
      <input
        type="text"
        readOnly={readonly}
        disabled={disabled}
        id={ID}
        className="components-text-control__input"
        list={state.addableItems.length && ID + '-datalist'}
        onKeyUp={onKeyUp}
        placeholder="Add ..."
        autoComplete="off"
      />
      {state.addableItems.length > 0 && (
        <datalist id={ID + '-datalist'}>
          {state.addableItems.map((_) => (
            <option key={`item-${_.value || _}`} value={_.value || _}>
              {_.label || _.value || _}
            </option>
          ))}
        </datalist>
      )}
    </>
  );
};

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
  TagInputEditor.propTypes = {
    instanceId: PropTypes.string.isRequired,
    readonly: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
  };
}

export default TagInputEditor;
