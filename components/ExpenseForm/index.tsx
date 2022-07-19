import { useState } from 'react';
import Input from '../Input';
import SaveCancelButtons from '../SaveCancelButtons';
import { isValidAmount } from '../../utils';

interface Props {
  name?: string;
  cost?: string;
  handleSaveExpense: (
    e: any,
    expenseName: string,
    expenseCost: string
  ) => void;
  handleCancelExpense: () => void;
}

function ExpenseForm(props: Props) {
  const { name, cost, handleSaveExpense, handleCancelExpense } =
    props;

  const [expenseName, setExpense] = useState<string>(name || '');
  const [expenseCost, setCost] = useState<string>(cost || '');

  function onSaveExpense(e: any) {
    e.preventDefault();
    handleSaveExpense(e, expenseName, expenseCost);
  }

  function handleNameChange(e: any) {
    const val = e.target.value;
    if (val.length <= 10) {
      setExpense(val);
    }
  }

  function handleCostChange(e: any) {
    const val = e.target.value;
    if (val === '' || (isValidAmount(val) && val.length <= 7)) {
      setCost(val);
    }
  }

  return (
    <>
      <form onSubmit={onSaveExpense} className="flex">
        <Input
          placeholder="Expense name"
          name="expenseName"
          value={expenseName}
          onChange={handleNameChange}
        />
        <Input
          placeholder="Cost"
          name="expenseCost"
          value={expenseCost}
          onChange={handleCostChange}
        />
        <button type="submit" className="hidden" />
      </form>
      <SaveCancelButtons
        handleSave={onSaveExpense}
        handleCancel={handleCancelExpense}
      />
    </>
  );
}

export default ExpenseForm;
