import { ChangeEvent, useState } from 'react';
import Expense from '../toolkit/Expense';
import ExpenseForm from './ExpenseForm';
import NewItemButton from './NewItemButton';
import Diner from '../toolkit/Diner';
import ExpensesListItem from './ExpensesListItem';

interface ExpensesListProps {
  expenses: Expense[];
  handleExpenseClick: (expense: Expense) => void;
  handleRemoveExpense: (expense: Expense) => void;
  setExpenses: (expenses: Expense[]) => void;
  selectedDiner: Diner | null;
}

function ExpensesList(props: ExpensesListProps) {
  const {
    expenses,
    handleExpenseClick,
    handleRemoveExpense,
    setExpenses,
    selectedDiner,
  } = props;

  const [isAddingNewExpense, setIsAddingNewExpense] =
    useState<boolean>(false);
  const [expenseToUpdate, setExpenseToUpdate] =
    useState<Expense | null>(null);

  const newExpenseFormProps = {
    handleSaveExpense: handleAddNewExpense,
    handleCancelExpense: resetNewExpense,
  };

  function handleUpdateExpense(expense: Expense) {
    setExpenseToUpdate(expense);
  }

  function resetExpenseToUpdate() {
    setExpenseToUpdate(null);
  }

  function handleSaveUpdatedExpense(
    e: ChangeEvent<HTMLFormElement>,
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
        (expense: Expense) =>
          expense.getID() === expenseToUpdate.getID()
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
    e: ChangeEvent<HTMLFormElement>,
    expenseName: string,
    expenseCost: string
  ) {
    e.preventDefault();

    if (expenseName.length > 0 && expenseCost.length > 0) {
      const newExpense = new Expense(
        expenseName,
        Number(expenseCost)
      );
      const newExpenses = [...expenses];
      newExpenses.push(newExpense);
      setExpenses(newExpenses);
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
