import { ChangeEvent, useState } from 'react';
import Input from '@/components/Input';
import SaveCancelButtons from '@/components/SaveCancelButtons';
import { isValidAmount } from '@/utils/index';

interface ExpenseFormProps {
  name?: string;
  cost?: string;
  handleSaveExpense: (
    e: ChangeEvent<HTMLFormElement>,
    expenseName: string,
    expenseCost: string
  ) => void;
  handleCancelExpense: () => void;
}

function ExpenseForm(props: ExpenseFormProps) {
  const { name, cost, handleSaveExpense, handleCancelExpense } =
    props;

  const [expenseName, setExpense] = useState<string>(name || '');
  const [expenseCost, setCost] = useState<string>(cost || '');

  function onSaveExpense(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSaveExpense(e, expenseName, expenseCost);
  }

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (val.length <= 10) {
      setExpense(val);
    }
  }

  function handleCostChange(e: ChangeEvent<HTMLInputElement>) {
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
