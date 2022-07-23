import { useState } from 'react';
import Expense from '../toolkit/Expense';
import MoreButton from './MoreButton';
import ExpenseForm from './ExpenseForm';
import NewItemButton from './NewItemButton';
import Diner from '../toolkit/Diner';

interface Props {
  expenses: Expense[];
  handleExpenseClick: (expense: Expense) => void;
  handleRemoveExpense: (expense: Expense) => void;
  setExpenses: (expenses: Expense[]) => void;
  selectedDiner: Diner | null;
}

function ExpensesList(props: Props) {
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

  function renderExpenses() {
    return expenses.map((expense: Expense) => {
      let selectedDinerHasExpense = false;
      if (
        expense
          .getDiners()
          .find((diner) => diner.getID() === selectedDiner?.getID())
      ) {
        selectedDinerHasExpense = true;
      }
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
          {!isUpdating ? (
            <>
              <div
                className={`flex justify-between w-full ${
                  selectedDinerHasExpense ? 'text-orange-500' : ''
                }`}
              >
                <span className="font-bold">
                  🍖 {expense.getName()}
                </span>
                <span>${expense.getCost().toFixed(2)}</span>
              </div>
              <MoreButton
                handleUpdate={() => handleUpdateExpense(expense)}
                handleRemove={() => handleRemoveExpense(expense)}
              />
            </>
          ) : (
            <div className="w-full">
              <ExpenseForm {...expenseFormProps} />
            </div>
          )}
        </div>
      );
    });
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
