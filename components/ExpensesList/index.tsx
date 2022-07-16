import { v4 as uuid } from 'uuid';
import UpdateForm from '../UpdateForm';
import SaveCancelButtons from '../SaveCancelButtons';
import EditDeleteButtons from '../EditDeleteButtons';
import ExpensesListItemText from '../ExpensesListItemText';

function ExpensesList(props: any) {
  const {
    expenses,
    updatingExpenseIdx,
    activeDiner,
    diners,
    handleSetAsignee,
    handleSaveUpdatedExpense,
    handleNameChange,
    expenseName,
    expenseCost,
    handleCostChange,
    handleCancelUpdateExpense,
    handleUpdateExpense,
    removeExpense,
  } = props;

  return expenses.map((expense: any, idx: number) => {
    const id = uuid();
    const isUpdatingExpense = updatingExpenseIdx === idx;
    const isAssignedToActiveDiner = expense.assignee === activeDiner;
    const assigneeName = '';
    // const assigneeName =
    //   expense.assignee !== null ? diners[expense.assignee].name : '';
    const listExpenseTextProps = {
      expense,
      isAssignedToActiveDiner,
      activeDiner,
      handleSetAsignee,
      idx,
      assigneeName,
    };

    return (
      <div key={id} className="flex">
        {!isUpdatingExpense ? (
          <ExpensesListItemText {...listExpenseTextProps} />
        ) : null}
        {isUpdatingExpense ? (
          <UpdateForm
            type="expense"
            handleSaveUpdated={handleSaveUpdatedExpense}
            handleNameChange={handleNameChange}
            name={expenseName}
            handleCostChange={handleCostChange}
            cost={expenseCost}
          />
        ) : null}
        {isUpdatingExpense ? (
          <SaveCancelButtons
            handleSave={handleSaveUpdatedExpense}
            handleCancelSave={handleCancelUpdateExpense}
          />
        ) : (
          <EditDeleteButtons
            handleUpdate={() =>
              handleUpdateExpense(idx, expense.name, expense.cost)
            }
            handleDelete={() => removeExpense(expense, idx)}
          />
        )}
      </div>
    );
  });
}

export default ExpensesList;
