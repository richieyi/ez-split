import { useReducer } from 'react';
import dinersReducer, {
  DINERS_TYPES,
} from '../reducers/dinersReducer';
import { exampleDiners } from '../utils/examples';

const initialState = exampleDiners;

interface Expense {
  id: string;
  name: string;
  cost: number;
  assignee: number | null;
}

function useDiners() {
  const [diners, dispatch] = useReducer(dinersReducer, initialState);

  function removeDiner(id: string) {
    dispatch({
      type: DINERS_TYPES.REMOVE_DINER,
      payload: id,
    });
    // const newDiners = [...diners];
    // if (diner.assignee !== null) {
    //   newDiners[diner.assignee].total -= diner.cost;
    // }

    // setDiners(diners.filter((_: any, i: number) => i !== idx));
    // setDiners(newDiners);
  }

  return {
    diners,
    removeDiner,
  };
}

export default useDiners;
