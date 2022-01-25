/**
 * @param {Array} items containing all possible predefined tags
 * @param {Function} onChange callback function to be called when selected items change
 * @return {Function} ready to use reducer function able be used with TagInput
 */
const reducer =
  (items) =>
  // eslint-disable-next-line no-shadow
  (state, {type, payload = undefined}) => {
    // console.log('dispatch(%o)', {type, payload});
    switch (type) {
      case ACTION_ADD_SELECTED: {
        // abort in case the item was a manually entered item already existing in items
        if (state.selected.indexOf(payload) !== -1) {
          return state;
        }
        const selected = state.selected.concat(payload);
        const addableItems = state.addableItems.filter(
          (item) => !selected.includes(item)
        );

        state = {
          ...state,
          selected,
          addableItems,
        };

        return state;
      }
      case ACTION_REMOVE_SELECTED: {
        const selected = state.selected.filter((item) => item !== payload);
        const addableItems = items.filter((item) => !selected.includes(item));

        state = {
          ...state,
          selected,
          addableItems,
        };

        return state;
      }
      case ACTION_SET_SELECTED:
        state = {
          ...state,
          selected: payload,
        };

        return state;
      default:
        throw new Error(`dont know how to handle action.type=${type}`);
    }
  };

export default reducer;

export const ACTION_SET_SELECTED = 'ACTION_SET_SELECTED';
export const ACTION_ADD_SELECTED = 'ACTION_ADD_SELECTED';
export const ACTION_REMOVE_SELECTED = 'ACTION_REMOVE_SELECTED';
