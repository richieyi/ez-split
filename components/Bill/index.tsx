import { useState } from 'react';
import Diner from '@/toolkit/Diner';
import Expense from '@/toolkit/Expense';
import DinersList from '@/components/DinersList';
import ExpensesList from '@/components/ExpensesList';
import TipAndTax from '@/components/TipAndTax';
import useBillLists from '@/hooks/useBillLists';
import { calculateSubtotal } from '@/utils/index';

export interface TipTax {
  tip: number;
  tax: number;
}

function Bill() {
  const {
    expenses,
    setExpenses,
    diners,
    setDiners,
    handleRemoveExpense,
    handleRemoveDiner,
  } = useBillLists();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedDiner, setSelectedDiner] = useState<Diner | null>(
    null
  );
  const [tipTax, setTipTax] = useState<TipTax>({
    tip: 0,
    tax: 0,
  });

  // When diner is selected and expense is clicked
  function handleExpenseClick(expense: Expense) {
    if (!selectedDiner) return;

    // If diner has expense, remove
    if (selectedDiner.getExpenses().find((exp) => exp === expense)) {
      selectedDiner.removeExpense(expense);
    } else {
      // Otherwise, add expense
      selectedDiner.addExpense(expense);
    }

    const newDiners = [...diners];
    const idx = newDiners.findIndex(
      (diner) => diner.getID() === selectedDiner.getID()
    );
    newDiners.splice(idx, 1, selectedDiner);
    setDiners(newDiners);
  }

  const subtotal = calculateSubtotal(expenses);
  const tipTaxTotal = tipTax.tip + tipTax.tax;
  const finalTotal = subtotal + tipTaxTotal;

  const expensesListProps = {
    expenses,
    handleExpenseClick,
    handleRemoveExpense,
    setExpenses,
    selectedDiner,
  };
  const dinersListProps = {
    diners,
    selectedDiner,
    setSelectedDiner,
    handleRemoveDiner,
    setDiners,
    tipTaxTotal,
    subtotal,
    finalTotal,
  };
  const tipAndTaxProps = {
    tipTax,
    setTipTax,
    subtotal,
    finalTotal,
  };

  return (
    <div className="text-center">
      <p className="my-6 text-sm lg:text-base">
        Add your expenses and diners. Click on a diner then an expense
        to assign. Easy.
      </p>
      <div className="flex-col lg:flex lg:flex-row w-full gap-8">
        <ExpensesList {...expensesListProps} />
        <DinersList {...dinersListProps} />
        <TipAndTax {...tipAndTaxProps} />
      </div>
    </div>
  );
}

export default Bill;
