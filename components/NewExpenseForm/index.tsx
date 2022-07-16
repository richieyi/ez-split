import SaveCancelButtons from '../SaveCancelButtons';
import Input from '../Input';

function NewExpenseForm(props: any) {
  const {
    handleSaveNewExpense,
    handleNameChange,
    expenseName,
    handleCostChange,
    expenseCost,
    handleCancelSaveExpense,
  } = props;

  return (
    <div className="flex">
      <div className="flex justify-between border-2 rounded border-slate-300 mt-2 mb-2 p-2 hover:bg-slate-100 w-5/6">
        <form className="flex" onSubmit={handleSaveNewExpense}>
          <Input
            name="expense"
            placeholder="Expense (Ex: Pizza)"
            onChange={handleNameChange}
            value={expenseName}
          />
          <Input
            name="expense"
            placeholder="Cost (Ex: 3.50)"
            onChange={handleCostChange}
            value={expenseCost}
          />
          <button type="submit" className="hidden" />
        </form>
      </div>
      <SaveCancelButtons
        handleSave={handleSaveNewExpense}
        handleCancelSave={handleCancelSaveExpense}
      />
    </div>
  );
}

export default NewExpenseForm;
