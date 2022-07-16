import useExpenses from '../../hooks/useExpenses';

function NewExpensesList(props: any) {
  const { expenses, removeExpense } = useExpenses();

  function renderExpenses() {
    return expenses.map((expense: any) => {
      return (
        <div key={expense.id}>
          <div>
            {expense.name} {expense.cost}
          </div>
          <button onClick={() => removeExpense(expense.id)}>
            Remove
          </button>
        </div>
      );
    });
  }

  return (
    <div>
      <h1>--Expenses--</h1>
      <div>{renderExpenses()}</div>
    </div>
  );
}

export default NewExpensesList;
