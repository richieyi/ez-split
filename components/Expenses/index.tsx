import { useState } from 'react';
import SectionHeader from '../SectionHeader';
import ExpensesList from '../ExpensesList';
import NewExpenseForm from '../NewExpenseForm';
import { isValidAmount } from '../../utils';
import useExpenses from '../../hooks/useExpenses';

interface Expense {
  id: string;
  name: string;
  cost: number;
  assignee: number | null;
}

function Expenses(props: any) {
  const { expenses, removeExpense } = useExpenses();
  console.log('HERE', expenses);

  const {
    setExpenses,
    diners,
    setDiners,
    activeDiner,
    handleSetAsignee,
  } = props;

  const [expenseName, setExpenseName] = useState<string>('');
  const [expenseCost, setExpenseCost] = useState<string>('');
  const [isAddingExpense, setIsAddingExpense] =
    useState<boolean>(false);
  const [updatingExpenseIdx, setUpdatingExpenseIdx] =
    useState<number>(-1);

  function handleAddNewExpense() {
    setUpdatingExpenseIdx(-1);
    setExpenseName('');
    setExpenseCost('');
    setIsAddingExpense(true);
  }

  function isValidExpense(): boolean {
    return (
      expenseName.length > 0 &&
      expenseCost.length > 0 &&
      Number(expenseCost) > 0
    );
  }

  function handleSaveNewExpense() {
    if (isValidExpense()) {
      setExpenses([
        ...expenses,
        {
          name: expenseName,
          cost: Number(expenseCost),
          assignee: null,
        },
      ]);
      setIsAddingExpense(false);
    }
  }

  function handleSaveUpdatedExpense(e: any) {
    e.preventDefault();

    if (isValidExpense()) {
      const newArr = [...expenses];
      const assignee = newArr[updatingExpenseIdx].assignee;
      newArr[updatingExpenseIdx] = {
        name: expenseName,
        cost: Number(expenseCost),
        assignee,
      };
      setExpenses(newArr);
      setUpdatingExpenseIdx(-1);
    }
  }

  function handleCancelSaveExpense() {
    setIsAddingExpense(false);
  }

  function handleUpdateExpense(
    idx: number,
    name: string,
    cost: number
  ) {
    setIsAddingExpense(false);
    setUpdatingExpenseIdx(idx);
    setExpenseName(name);
    setExpenseCost(String(cost));
  }

  function handleNameChange(e: any) {
    const val = e.target.value;

    if (val.length <= 16) {
      setExpenseName(e.target.value);
    }
  }

  function handleCostChange(e: any) {
    const val = e.target.value;

    if (
      val === '' ||
      (val !== '$' && isValidAmount(val) && val.length < 7)
    ) {
      setExpenseCost(e.target.value);
    }
  }

  function handleCancelUpdateExpense() {
    setUpdatingExpenseIdx(-1);
  }

  function displayTotal() {
    return expenses.reduce(
      (prevVal: any, currVal: any) => prevVal + currVal.cost,
      0
    );
  }

  const expensesProps = {
    expenses,
    updatingExpenseIdx,
    activeDiner,
    diners,
    handleSetAsignee,
    handleSaveUpdatedExpense,
    handleNameChange,
    expenseName,
    expenseCost,
    handleCostChange,
    handleCancelUpdateExpense,
    handleUpdateExpense,
    removeExpense,
  };
  const newExpenseFormProps = {
    handleSaveNewExpense,
    handleNameChange,
    expenseName,
    handleCostChange,
    expenseCost,
    handleCancelSaveExpense,
  };

  return (
    <div className="mb-8">
      <SectionHeader
        headerTitle={`Expenses (${expenses.length})`}
        isAdding={isAddingExpense}
        handleAddNew={handleAddNewExpense}
      />
      {<ExpensesList {...expensesProps} />}
      {isAddingExpense ? (
        <NewExpenseForm {...newExpenseFormProps} />
      ) : null}
      <div className="flex justify-between p-2 font-bold">
        <span>Total</span>
        <span>{`$${displayTotal().toFixed(2)}`}</span>
      </div>
    </div>
  );
}

export default Expenses;
