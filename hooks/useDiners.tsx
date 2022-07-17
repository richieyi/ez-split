import { useReducer } from 'react';
import dinersReducer, {
  DINERS_TYPES,
} from '../reducers/dinersReducer';
import { exampleDiners } from '../utils/examples';

const initialState = exampleDiners;

interface Diner {
  id: string;
  name: string;
  expenses: [];
}

function useDiners() {
  const [diners, dispatch] = useReducer(dinersReducer, initialState);

  function addDiner(diner: Diner) {
    dispatch({
      type: DINERS_TYPES.ADD_DINER,
      payload: diner,
    });
  }

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
    addDiner,
    removeDiner,
  };
}

export default useDiners;
