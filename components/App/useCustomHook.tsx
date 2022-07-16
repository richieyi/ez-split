import { useState } from 'react';
import { exampleExpenses, exampleDiners } from '../../utils/examples';

interface Expense {
  name: string;
  cost: number;
  assignee: number | null;
}

interface Diner {
  name: string;
  expenses?: Expense[];
  total: number;
}

function useCustomHook() {
  // const [expenses, setExpenses] =
  //   useState<Expense[]>(exampleExpenses);
  const [diners, setDiners] = useState<Diner[]>(exampleDiners);
  const [activeDiner, setActiveDiner] = useState<number>(-1);

  // function handleSetAsignee(
  //   expenseIdx: number,
  //   expenseCost: number,
  //   expenseAssignee: number | null,
  //   isAssignedToActiveDiner: boolean
  // ) {
  //   const newExpenses = [...expenses];
  //   const newDiners = [...diners];
  //   const currentlyAssignedDiner = expenses[expenseIdx].assignee;

  //   if (expenseAssignee === null) {
  //     // Expense is not assigned at all => assign expense to active diner
  //     newExpenses[expenseIdx].assignee = activeDiner;
  //     newDiners[activeDiner].total += expenseCost;
  //   } else if (expenseAssignee !== null && isAssignedToActiveDiner) {
  //     // Expense is assigned to active diner => unassign expense from active diner
  //     newExpenses[expenseIdx].assignee = null;
  //     newDiners[activeDiner].total -= expenseCost;
  //   } else if (expenseAssignee !== null && !isAssignedToActiveDiner) {
  //     // Expense is assigned, but not assigned to active diner => re-assign expense to active diner
  //     newExpenses[expenseIdx].assignee = activeDiner;
  //     newDiners[activeDiner].total += expenseCost;

  //     if (currentlyAssignedDiner !== null) {
  //       newDiners[currentlyAssignedDiner].total -= expenseCost;
  //     }
  //   }

  //   setExpenses(newExpenses);
  //   setDiners(newDiners);
  // }

  return {
    // expenses,
    // setExpenses,
    diners,
    setDiners,
    activeDiner,
    setActiveDiner,
    // handleSetAsignee,
  };
}

export default useCustomHook;
