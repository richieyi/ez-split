const ADD_EXPENSE = 'ADD_EXPENSE';
const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
const UPDATE_EXPENSE = 'UPDATE_EXPENSE';

export const EXPENSES_TYPES = {
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  UPDATE_EXPENSE,
};

function expensesReducer(state: any, action: any) {
  console.log('state', state);
  console.log('payload', action.payload);
  switch (action.type) {
    case ADD_EXPENSE:
      return [...state, action.payload];
    case REMOVE_EXPENSE:
      return state.filter(
        (expense: any) => expense.id !== action.payload
      );
    case UPDATE_EXPENSE:
      const idx = state.findIndex(
        (expense: any) => expense.id === action.payload.id
      );
      state[idx] = action.payload;
      return state;
    default:
      throw new Error(
        `Action type of ${action.type} does not exist.`
      );
  }
}

export default expensesReducer;
