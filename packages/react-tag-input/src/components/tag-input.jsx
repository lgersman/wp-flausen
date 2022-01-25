import React, {useReducer, useMemo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useId} from '@wp-flausen/react-18-shim';

import TagInputEditor from './tag-input-editor.jsx';
import TagInputSelector from './tag-input-selector.jsx';
import TagInputItem from './tag-input-item.jsx';
import reducer from './../reducer.js';

function RenderTag({item, children}) {
  return (
    <div>
      <div style={{padding: '0 5px 0 5px'}}>
        {item.label || item.value || item}
      </div>
      {children}
    </div>
  );
}

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
  RenderTag.propTypes = {
    item: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
    children: PropTypes.node.isRequired,
  };
}

export const TagInputContext = React.createContext();
function TagInput(props) {
  const {
    id = null,
    className,
    style,
    selected = [],
    items = [],
    onChange = () => {},
    canRemove = true,
    canAdd = true,
    canReorder = true,
    isEnum = false,
    renderTag = RenderTag,
  } = props;

  const [state, dispatch] = useReducer(
    reducer(items),
    {selected},
    ({selected}) => {
      return {
        selected,
        addableItems: items.filter((item) => !selected.includes(item)),
      };
    }
  );

  useEffect(() => {
    if (selected !== state.selected) {
      onChange(state.selected);
    }
  }, [onChange, selected, state.selected]);

  const tagInputContext = useMemo(() => {
    return {state, dispatch};
  }, [state]);

  let instanceId = useId();
  if (id !== null) {
    instanceId = id;
  }
  const ID = `${TagInput.className}-${instanceId}`;

  const reorderContext = canReorder && {
    draggedItemIndex: -1,
    itemElements: [],
  };

  return (
    <TagInputContext.Provider value={tagInputContext}>
      <div
        id={ID}
        className={`${TagInput.className} ${className}`}
        style={style}
        onClick={() =>
          document
            .getElementById(`${TagInput.className}-editor-${instanceId}`)
            ?.focus()
        }
      >
        {state.selected.map((item, index) => (
          <TagInputItem
            key={`item-${item.value || item}`}
            index={index}
            RenderTag={renderTag}
            reorderContext={reorderContext}
            canRemove={canRemove}
          />
        ))}
        {canAdd && (
          <div
            className={`${TagInput.className}__editor`}
            style={{order: state.selected.length}}
          >
            {React.createElement(isEnum ? TagInputSelector : TagInputEditor, {
              instanceId,
            })}
          </div>
        )}
      </div>
    </TagInputContext.Provider>
  );
}
TagInput.className = 'react-tag-input';

TagInput.defaultProps = {
  id: null,
  className: '',
  style: {},
  selected: [],
  items: [],
  onChange() {},
  canRemove: true,
  canAdd: true,
  canReorder: true,
  isEnum: false,
  renderTag: RenderTag,
};

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
  TagInput.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    selected: PropTypes.array,
    items: PropTypes.array,
    isEnum: PropTypes.bool,
    onChange: PropTypes.func,
    canRemove: PropTypes.bool,
    canAdd: PropTypes.bool,
    canReorder: PropTypes.bool,
    renderTag: PropTypes.func,
  };
}

export default TagInput;
