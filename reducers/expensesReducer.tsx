const ADD_EXPENSE = 'ADD_EXPENSE';
const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const EXPENSES_TYPES = {
  ADD_EXPENSE,
  REMOVE_EXPENSE,
};

function expensesReducer(state: any, action: any) {
  switch (action.type) {
    case ADD_EXPENSE:
      return [...state, action.payload];
    case REMOVE_EXPENSE:
      const newState = state.filter(
        (expense: any) => expense.id !== action.payload
      );
      return newState;
    default:
      throw new Error(
        `Action type of ${action.type} does not exist.`
      );
  }
}

export default expensesReducer;
