import Input from '../Input';
import IconButton from '../IconButton';
import SaveCancelButtons from '../SaveCancelButtons';

function NewExpenseForm(props: any) {
  const {
    handleAddNewExpense,
    expense,
    setExpense,
    cost,
    setCost,
    resetNewExpense,
  } = props;

  return (
    <div className="border rounded p-4">
      <form onSubmit={handleAddNewExpense} className="flex">
        <Input
          placeholder="Expense Name"
          name="expense"
          value={expense}
          onChange={(e: any) => setExpense(e.target.value)}
        />
        <Input
          placeholder="Cost"
          name="cost"
          value={cost}
          onChange={(e: any) => setCost(e.target.value)}
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
