import { useState } from 'react';
import Expense from '../../toolkit/Expense';
import MoreButton from '../MoreButton';
import ExpenseForm from '../ExpenseForm';
import NewItemButton from '../NewItemButton';

function ExpensesList(props: any) {
  const {
    expenses,
    selectedExpense,
    handleExpenseClick,
    handleRemoveExpense,
    setExpenses,
  } = props;

  const [isAddingNewExpense, setIsAddingNewExpense] =
    useState<boolean>(false);
  const [expenseToUpdate, setExpenseToUpdate] =
    useState<Expense | null>(null);

  const expenseFormProps = {
    name: expenseToUpdate?.getName(),
    cost: String(expenseToUpdate?.getCost()),
    handleSaveExpense: handleSaveUpdatedExpense,
    handleCancelExpense: resetExpenseToUpdate,
  };
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
    expense: string,
    cost: string
  ) {
    e.preventDefault();

    if (expense.length > 0 && cost.length > 0) {
      const newExpenses = [...expenses];
      const newExpense = new Expense(expense, Number(cost));
      newExpenses.push(newExpense);
      setExpenses(newExpenses);
      resetNewExpense();
    }
  }

  function renderExpenses() {
    return expenses.map((expense: Expense) => {
      const isSelected = selectedExpense === expense;
      const isUpdating = expenseToUpdate === expense;

      return (
        <div
          key={expense.getID()}
          className={`flex justify-between items-center border rounded p-2 my-2 ${
            isUpdating
              ? ''
              : 'hover:cursor-pointer hover:bg-slate-300'
          } bg-white`}
          onClick={
            isUpdating ? () => {} : () => handleExpenseClick(expense)
          }
        >
          {isUpdating ? (
            <div className="w-full">
              <ExpenseForm {...expenseFormProps} />
            </div>
          ) : (
            <div
              className={`flex justify-between w-full ${
                isSelected ? 'text-green-500' : ''
              }`}
            >
              <span className="font-bold">
                🍖 {expense.getName()}
              </span>
              <span>${expense.getCost().toFixed(2)}</span>
            </div>
          )}
          {isUpdating ? null : (
            <MoreButton
              handleUpdate={() => handleUpdateExpense(expense)}
              handleRemove={() => handleRemoveExpense(expense)}
            />
          )}
        </div>
      );
    });
  }

  return (
    <div className="flex-1">
      <h1 className="text-2xl font-bold my-4 md:text-center text-left">
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
