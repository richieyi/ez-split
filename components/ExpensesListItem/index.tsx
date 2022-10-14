import React, { ChangeEvent } from 'react';
import MoreButton from '@/components/MoreButton';
import ExpenseForm from '@/components/ExpenseForm';
import Diner from '@/toolkit/Diner';
import Expense from '@/toolkit/Expense';

interface ExpensesListItemProps {
  expense: Expense;
  expenseToUpdate: Expense | null;
  handleUpdateExpense: (expense: Expense) => void;
  handleSaveUpdatedExpense: (
    e: ChangeEvent<HTMLFormElement>,
    expenseName: string,
    expenseCost: string
  ) => void;
  resetExpenseToUpdate: () => void;
  handleExpenseClick: (expense: Expense) => void;
  handleRemoveExpense: (expense: Expense) => void;
  selectedDiner: Diner | null;
}

function ExpensesListItem(props: ExpensesListItemProps) {
  const {
    expense,
    expenseToUpdate,
    selectedDiner,
    handleExpenseClick,
    handleUpdateExpense,
    handleRemoveExpense,
    handleSaveUpdatedExpense,
    resetExpenseToUpdate,
  } = props;

  const selectedDinerHasExpense = expense
    .getDiners()
    .find((diner: Diner) => diner.getID() === selectedDiner?.getID());
  const isUpdating = expenseToUpdate === expense;

  const expenseFormProps = {
    name: expenseToUpdate?.getName(),
    cost: String(expenseToUpdate?.getCost()),
    handleSaveExpense: handleSaveUpdatedExpense,
    handleCancelExpense: resetExpenseToUpdate,
  };

  return (
    <div
      key={expense.getID()}
      className={`flex justify-between items-center border rounded p-2 my-2 ${
        isUpdating ? '' : 'hover:cursor-pointer hover:bg-slate-200'
      } bg-white shadow-md`}
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
            <span className="font-bold">🍖 {expense.getName()}</span>
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
}

export default ExpensesListItem;
