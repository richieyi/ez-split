import { useState } from 'react';
import useExpenses from '../../hooks/useExpenses';
import NewExpenseForm from '../NewExpenseForm';

function NewExpensesList() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const { expenses, removeExpense, addExpense } = useExpenses();

  function handleHideForm() {
    setShowForm(false);
  }

  function renderExpenses() {
    return expenses.map((expense: any) => {
      return (
        <div key={expense.id}>
          <div>
            {expense.name} {expense.cost}
          </div>
          <button onClick={() => removeExpense(expense.id)}>
            Remove Expense
          </button>
        </div>
      );
    });
  }

  return (
    <div>
      <h1>--Expenses--</h1>
      <div>{renderExpenses()}</div>
      {!showForm ? (
        <div onClick={() => setShowForm(true)}>Add New Expense</div>
      ) : (
        <NewExpenseForm
          addExpense={addExpense}
          handleHideForm={handleHideForm}
        />
      )}
    </div>
  );
}

export default NewExpensesList;
