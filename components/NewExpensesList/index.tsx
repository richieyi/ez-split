import { useState } from 'react';
import useActiveItem from '../../hooks/useActiveItem';
import useDiners from '../../hooks/useDiners';
import useExpenses from '../../hooks/useExpenses';
import EditDeleteButtons from '../EditDeleteButtons';
import NewExpenseForm from '../NewExpenseForm';

function NewExpensesList() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const { expenses, addExpense, removeExpense, updateExpense } =
    useExpenses();
  const { activeDiner, activeExpense, updateActiveExpense } =
    useActiveItem();
  const { updateDiner } = useDiners();
  console.log('exp', expenses);
  console.log('active diner', activeDiner);

  function handleUpdateExpense(expense: any) {
    console.log('updating');
    const newExpense = { ...expense, diners: [activeDiner] };
    updateExpense(newExpense);
    const newDiner = { ...activeDiner, expenses: [activeExpense] };
    updateDiner(newDiner);
  }

  function handleExpenseClick(expense: any) {
    console.log('clicked', activeDiner);
    updateActiveExpense(expense);
    if (activeDiner) {
      handleUpdateExpense(expense);
    }
  }

  function renderExpenses() {
    return expenses.map((expense: any) => {
      const isActiveExpense = expense.id === activeExpense?.id;
      return (
        <div
          key={expense.id}
          className="border p-2 my-4 flex justify-between"
        >
          <div
            className={isActiveExpense ? 'text-red-500' : ''}
            onClick={() => handleExpenseClick(expense)}
          >
            {expense.name} {expense.cost}
          </div>
          <EditDeleteButtons
            handleDelete={() => removeExpense(expense.id)}
          />
        </div>
      );
    });
  }

  return (
    <div>
      <h1>--Expenses--</h1>
      <div>{renderExpenses()}</div>
      {!showForm ? (
        <button onClick={() => setShowForm(true)}>
          Add New Expense
        </button>
      ) : (
        <NewExpenseForm
          addExpense={addExpense}
          handleHideForm={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default NewExpensesList;
