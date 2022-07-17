import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import SaveCancelButtons from '../SaveCancelButtons';
import Input from '../Input';

function NewExpenseForm(props: any) {
  const { addExpense, handleHideForm } = props;

  const [expenseName, setExpenseName] = useState<string>('');
  const [expenseCost, setExpenseCost] = useState<string>('');

  function handleSaveNewExpense() {
    addExpense({
      id: uuid(),
      name: expenseName,
      cost: expenseCost,
      diners: [],
    });
    handleHideForm();
  }

  function handleNameChange(e: any) {
    setExpenseName(e.target.value);
  }

  function handleCostChange(e: any) {
    setExpenseCost(e.target.value);
  }

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
        handleCancelSave={handleHideForm}
      />
    </div>
  );
}

export default NewExpenseForm;
