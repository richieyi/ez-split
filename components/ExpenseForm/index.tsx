import Input from '../Input';
import SaveCancelButtons from '../SaveCancelButtons';
import { isValidAmount } from '../../utils';

function ExpenseForm(props: any) {
  const {
    handleSaveExpense,
    expense,
    handleExpenseNameChange,
    cost,
    handleExpenseCostChange,
    handleCancelExpense,
  } = props;

  function handleNameChange(e: any) {
    const val = e.target.value;
    if (val.length <= 12) {
      handleExpenseNameChange(val);
    }
  }

  function handleCostChange(e: any) {
    const val = e.target.value;
    if (val === '' || (isValidAmount(val) && val.length <= 7)) {
      handleExpenseCostChange(val);
    }
  }

  return (
    <>
      <form onSubmit={handleSaveExpense} className="flex">
        <Input
          placeholder="Expense name"
          name="expense"
          value={expense}
          onChange={handleNameChange}
        />
        <Input
          placeholder="Cost"
          name="cost"
          value={cost}
          onChange={handleCostChange}
        />
        <button type="submit" className="hidden" />
      </form>
      <SaveCancelButtons
        handleSave={handleSaveExpense}
        handleCancel={handleCancelExpense}
      />
    </>
  );
}

export default ExpenseForm;
