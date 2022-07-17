const ADD_DINER = 'ADD_DINER';
const REMOVE_DINER = 'REMOVE_DINER';
const UPDATE_DINER = 'UPDATE_DINER';

export const DINERS_TYPES = {
  ADD_DINER,
  REMOVE_DINER,
  UPDATE_DINER,
};

function dinersReducer(state: any, action: any) {
  console.log('state', state);
  console.log('payload', action.payload);
  switch (action.type) {
    case ADD_DINER:
      return [...state, action.payload];
    case REMOVE_DINER:
      return state.filter(
        (diner: any) => diner.id !== action.payload
      );
    case UPDATE_DINER:
      const idx = state.findIndex(
        (diner: any) => diner.id === action.payload.id
      );
      state[idx] = action.payload;
      return state;
    default:
      throw new Error(
        `Action type of ${action.type} does not exist.`
      );
  }
}

export default dinersReducer;
