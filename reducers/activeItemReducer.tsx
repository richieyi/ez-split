const UPDATE_ACTIVE_DINER = 'UPDATE_ACTIVE_DINER';
const UPDATE_ACTIVE_EXPENSE = 'UPDATE_ACTIVE_EXPENSE';

export const ACTIVE_ITEM_TYPES = {
  UPDATE_ACTIVE_DINER,
  UPDATE_ACTIVE_EXPENSE,
};

function activeItemReducer(state: any, action: any) {
  switch (action.type) {
    case UPDATE_ACTIVE_DINER:
      return { ...state, activeDiner: action.payload };
    case UPDATE_ACTIVE_EXPENSE:
      return { ...state, activeExpense: action.payload };
    default:
      throw new Error(
        `Action type of ${action.type} does not exist.`
      );
  }
}

export default activeItemReducer;
