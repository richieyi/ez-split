const ADD_DINER = 'ADD_DINER';
const REMOVE_DINER = 'REMOVE_DINER';

export const DINERS_TYPES = {
  ADD_DINER,
  REMOVE_DINER,
};

function dinersReducer(state: any, action: any) {
  switch (action.type) {
    case ADD_DINER:
      return [...state, action.payload];
    case REMOVE_DINER:
      const newState = state.filter(
        (diner: any) => diner.id !== action.payload
      );
      return newState;
    default:
      throw new Error(
        `Action type of ${action.type} does not exist.`
      );
  }
}

export default dinersReducer;
