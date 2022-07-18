import Input from '../Input';
import SaveCancelButtons from '../SaveCancelButtons';

function NewExpenseForm(props: any) {
  const {
    handleAddNewExpense,
    expense,
    handleExpenseNameChange,
    cost,
    handleExpenseCostChange,
    resetNewExpense,
  } = props;

  return (
    <div className="border rounded p-4">
      <form onSubmit={handleAddNewExpense} className="flex">
        <Input
          placeholder="Expense name"
          name="expense"
          value={expense}
          onChange={handleExpenseNameChange}
        />
        <Input
          placeholder="Cost"
          name="cost"
          value={cost}
          onChange={handleExpenseCostChange}
        />
      </form>
      <SaveCancelButtons
        handleSave={handleAddNewExpense}
        handleCancel={resetNewExpense}
      />
    </div>
  );
}

export default NewExpenseForm;
