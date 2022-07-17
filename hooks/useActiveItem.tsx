import { useReducer } from 'react';
import activeItemReducer, {
  ACTIVE_ITEM_TYPES,
} from '../reducers/activeItemReducer';

const initialState = {
  activeExpense: null,
  activeDiner: null,
};

function useActiveItem() {
  const [state, dispatch] = useReducer(
    activeItemReducer,
    initialState
  );
  const { activeDiner, activeExpense } = state;

  function updateActiveDiner(diner: any) {
    dispatch({
      type: ACTIVE_ITEM_TYPES.UPDATE_ACTIVE_DINER,
      payload: diner,
    });
  }

  function updateActiveExpense(diner: any) {
    dispatch({
      type: ACTIVE_ITEM_TYPES.UPDATE_ACTIVE_EXPENSE,
      payload: diner,
    });
  }

  return {
    activeDiner,
    activeExpense,
    updateActiveDiner,
    updateActiveExpense,
  };
}

export default useActiveItem;
