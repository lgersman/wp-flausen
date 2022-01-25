import React, {useEffect, useRef, useContext} from 'react';
import {Button} from '@wordpress/components';
import {cancelCircleFilled} from '@wordpress/icons';
import PropTypes from 'prop-types';
import TagInput, {TagInputContext} from './tag-input.jsx';

import {ACTION_REMOVE_SELECTED, ACTION_SET_SELECTED} from './../reducer.js';

function TagInputItem({index, reorderContext, canRemove, RenderTag}) {
  const {state, dispatch} = useContext(TagInputContext);

  const isDraggable =
    reorderContext && state.selected.length > 1 ? true : undefined;

  const DRAGGED_CLASSNAME = `${TagInput.className}--dragged`;

  const ref = useRef();

  const item = state.selected[index];

  useEffect(() => {
    isDraggable && reorderContext.itemElements.push(ref.current);
  });

  const onDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    reorderContext.draggedItemIndex = index;
    ref.current.classList.toggle(DRAGGED_CLASSNAME);
  };

  const onDragEnter = (e) => {
    e.preventDefault();
    if (reorderContext.draggedItemIndex !== index) {
      [
        reorderContext.itemElements[reorderContext.draggedItemIndex].style
          .order,
        reorderContext.itemElements[index].style.order,
      ] = [
        reorderContext.itemElements[index].style.order,
        reorderContext.itemElements[reorderContext.draggedItemIndex].style
          .order,
      ];
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDrop = (e) => {
    e.preventDefault();
    if (
      Number.parseInt(reorderContext.itemElements[index].style.order) !== index
    ) {
      const selected = reorderContext.itemElements.reduce(
        (selected, itemElement, index) => {
          selected[Number.parseInt(itemElement.style.order)] =
            state.selected[index];
          return selected;
        },
        Array(state.selected.length)
      );
      dispatch({type: ACTION_SET_SELECTED, payload: selected});
    }
  };

  const onDragEnd = () => {
    ref.current.classList.toggle(DRAGGED_CLASSNAME);
  };
  return (
    <div
      style={{order: index}}
      ref={ref}
      className={`${TagInput.className}__item`}
      title={item.value || null}
      draggable={isDraggable}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
    >
      <RenderTag item={item}>
        {canRemove && (
          <Button
            isSmall
            isDestructive
            icon={cancelCircleFilled}
            label={'Remove'}
            onClick={() =>
              dispatch({
                type: ACTION_REMOVE_SELECTED,
                payload: state.selected[index],
              })
            }
          ></Button>
        )}
      </RenderTag>
    </div>
  );
}

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
  TagInputItem.propTypes = {
    reorderContext: PropTypes.any,
    index: PropTypes.number,
    RenderTag: PropTypes.func,
    canRemove: PropTypes.bool,
  };
}

export default TagInputItem;
