import { useReducer } from 'react';
import expensesReducer, {
  EXPENSES_TYPES,
} from '../reducers/expensesReducer';
import { exampleExpenses } from '../utils/examples';

const initialState = exampleExpenses;

interface Expense {
  id: string;
  name: string;
  cost: number;
  assignee: number | null;
}

function useExpenses() {
  const [expenses, dispatch] = useReducer(
    expensesReducer,
    initialState
  );

  function removeExpense(id: string) {
    dispatch({
      type: EXPENSES_TYPES.REMOVE_EXPENSE,
      payload: id,
    });
    // const newDiners = [...diners];
    // if (expense.assignee !== null) {
    //   newDiners[expense.assignee].total -= expense.cost;
    // }

    // setExpenses(expenses.filter((_: any, i: number) => i !== idx));
    // setDiners(newDiners);
  }

  return {
    expenses,
    removeExpense,
  };
}

export default useExpenses;
