import Expense from '../../toolkit/Expense';
import MoreButton from '../MoreButton';
import ExpenseForm from '../ExpenseForm';

function ExpensesList(props: any) {
  const {
    expenses,
    selectedExpense,
    expenseToUpdate,
    handleSaveUpdatedExpense,
    expenseUpdatedName,
    handleExpenseNameChange,
    expenseUpdatedCost,
    handleExpenseCostChange,
    resetExpenseToUpdate,
    handleExpenseClick,
    handleUpdateExpense,
    handleRemoveExpense,
  } = props;

  return expenses.map((expense: Expense) => {
    const isSelected = selectedExpense === expense;
    const isUpdating = expenseToUpdate === expense;

    return (
      <div
        key={expense.getID()}
        className={`flex justify-between items-center border rounded p-2 my-2 ${
          isUpdating ? '' : 'hover:cursor-pointer hover:bg-slate-300'
        } bg-white`}
        onClick={
          isUpdating ? () => {} : () => handleExpenseClick(expense)
        }
      >
        {isUpdating ? (
          <div className="w-full">
            <ExpenseForm
              handleSaveExpense={handleSaveUpdatedExpense}
              expense={expenseUpdatedName}
              handleExpenseNameChange={handleExpenseNameChange}
              cost={expenseUpdatedCost}
              handleExpenseCostChange={handleExpenseCostChange}
              handleCancelExpense={resetExpenseToUpdate}
            />
          </div>
        ) : (
          <div
            className={`flex justify-between w-full ${
              isSelected ? 'text-green-500' : ''
            }`}
          >
            <span className="font-bold">🍖 {expense.getName()}</span>
            <span>${expense.getCost()}</span>
          </div>
        )}
        {expenseToUpdate === expense ? null : (
          <MoreButton
            handleUpdate={() => handleUpdateExpense(expense)}
            handleRemove={() => handleRemoveExpense(expense)}
          />
        )}
      </div>
    );
  });
}

export default ExpensesList;
