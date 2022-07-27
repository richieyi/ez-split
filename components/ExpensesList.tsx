import { useState } from 'react';
import Expense from '../toolkit/Expense';
import ExpenseForm from './ExpenseForm';
import NewItemButton from './NewItemButton';
import Diner from '../toolkit/Diner';
import ExpensesListItem from './ExpensesListItem';
import { useDinerStore } from '../hooks/useBillStore';
import { useExpenseStore } from '../hooks/useExpenseStore';

interface Props {
  // expenses: Expense[];
  handleExpenseClick: (expense: Expense) => void;
  // handleRemoveExpense: (expense: Expense) => void;
  // setExpenses: (expenses: Expense[]) => void;
  selectedDiner: Diner | null;
}

function ExpensesList(props: Props) {
  const {
    // expenses,
    handleExpenseClick,
    // handleRemoveExpense,
    // setExpenses,
    selectedDiner,
  } = props;
  const { expenses, setExpenses, addExpense, removeExpense } =
    useExpenseStore();
  const { diners, setDiners } = useDinerStore();

  const [isAddingNewExpense, setIsAddingNewExpense] =
    useState<boolean>(false);
  const [expenseToUpdate, setExpenseToUpdate] =
    useState<Expense | null>(null);

  const newExpenseFormProps = {
    handleSaveExpense: handleAddNewExpense,
    handleCancelExpense: resetNewExpense,
  };

  function handleRemoveExpense(expenseToRemove: Expense) {
    const newDiners = [...diners];
    newDiners.forEach((diner) =>
      diner.removeExpense(expenseToRemove)
    );
    setDiners(newDiners);

    removeExpense(expenseToRemove);
  }

  function handleUpdateExpense(expense: Expense) {
    setExpenseToUpdate(expense);
  }

  function resetExpenseToUpdate() {
    setExpenseToUpdate(null);
  }

  function handleSaveUpdatedExpense(
    e: any,
    expenseName: string,
    expenseCost: string
  ) {
    e.preventDefault();

    if (
      expenseToUpdate &&
      expenseName.length > 0 &&
      expenseCost.length > 0
    ) {
      expenseToUpdate.updateExpense(expenseName, Number(expenseCost));

      const newExpenses = [...expenses];
      const idx = newExpenses.findIndex(
        (expense: any) => expense.getID() === expenseToUpdate.getID()
      );
      newExpenses.splice(idx, 1, expenseToUpdate);
      setExpenses(newExpenses);
      resetExpenseToUpdate();
    }
  }

  function resetNewExpense() {
    setIsAddingNewExpense(false);
  }

  function handleAddNewExpense(
    e: any,
    expenseName: string,
    expenseCost: string
  ) {
    e.preventDefault();

    if (expenseName.length > 0 && expenseCost.length > 0) {
      const newExpense = new Expense(
        expenseName,
        Number(expenseCost)
      );
      // const newExpenses = [...expenses];
      // newExpenses.push(newExpense);
      // setExpenses(newExpenses);
      addExpense(newExpense);
      resetNewExpense();
    }
  }

  const expensesListItemProps = {
    expenseToUpdate,
    selectedDiner,
    handleExpenseClick,
    handleUpdateExpense,
    handleRemoveExpense,
    handleSaveUpdatedExpense,
    resetExpenseToUpdate,
  };

  function renderExpenses() {
    return expenses.map((expense: Expense) => (
      <ExpensesListItem
        key={expense.getID()}
        expense={expense}
        {...expensesListItemProps}
      />
    ));
  }

  return (
    <div className="flex-1">
      <h1 className="text-2xl font-bold my-4 lg:text-center text-left">
        Expenses 🍖
      </h1>
      {renderExpenses()}
      {isAddingNewExpense ? (
        <div className="border rounded p-2 bg-white">
          <ExpenseForm {...newExpenseFormProps} />
        </div>
      ) : (
        <NewItemButton
          setIsAddingNewItem={() => setIsAddingNewExpense(true)}
          itemType="Expense"
        />
      )}
    </div>
  );
}

export default ExpensesList;
