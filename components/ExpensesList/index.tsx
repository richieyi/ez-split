import Input from '../Input';
import Expense from '../../toolkit/Expense';
import MoreButton from '../MoreButton';
import SaveCancelButtons from '../SaveCancelButtons';

function ExpensesList(props: any) {
  const {
    expenses,
    selectedExpense,
    expenseToUpdate,
    handleSaveUpdatedExpense,
    expenseNewName,
    handleExpenseNameChange,
    expenseNewCost,
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
          isUpdating ? '' : 'hover:bg-slate-300'
        } bg-white`}
      >
        {isUpdating ? (
          <div className="w-full">
            <form
              onSubmit={handleSaveUpdatedExpense}
              className="flex"
            >
              <Input
                name="expenseNewName"
                placeholder="Expense name"
                value={expenseNewName}
                onChange={handleExpenseNameChange}
              />
              <Input
                name="expenseNewCost"
                placeholder="Cost"
                value={expenseNewCost}
                onChange={handleExpenseCostChange}
              />
            </form>
            <SaveCancelButtons
              handleSave={handleSaveUpdatedExpense}
              handleCancel={resetExpenseToUpdate}
            />
          </div>
        ) : (
          <div
            className={`flex justify-between hover:cursor-pointer w-full ${
              isSelected ? 'text-green-500' : ''
            }`}
            onClick={() => handleExpenseClick(expense)}
          >
            <span className="font-bold">{expense.getName()}</span>{' '}
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
