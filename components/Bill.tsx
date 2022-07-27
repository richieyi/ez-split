import { useState } from 'react';
import Diner from '../toolkit/Diner';
import Expense from '../toolkit/Expense';
import DinersList from './DinersList';
import ExpensesList from './ExpensesList';
import TipAndTax from './TipAndTax';
import { calculateSubtotal } from '../utils';
import { useDinerStore } from '../hooks/useBillStore';
import { useExpenseStore } from '../hooks/useExpenseStore';

interface TipTax {
  tip: number;
  tax: number;
}

function Bill() {
  const { expenses } = useExpenseStore();
  const { diners, setDiners } = useDinerStore();

  // Selected diner
  const [selectedDiner, setSelectedDiner] = useState<Diner | null>(
    null
  );
  const [tipTax, setTipTax] = useState<TipTax>({
    tip: 8.5,
    tax: 12.75,
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
    // expenses,
    handleExpenseClick,
    // handleRemoveExpense,
    // setExpenses,
    selectedDiner,
  };
  const dinersListProps = {
    // diners,
    selectedDiner,
    setSelectedDiner,
    // handleRemoveDiner,
    // setDiners,
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
    <div className="flex-col lg:flex lg:flex-row w-full gap-8">
      <ExpensesList {...expensesListProps} />
      <DinersList {...dinersListProps} />
      <TipAndTax {...tipAndTaxProps} />
    </div>
  );
}

export default Bill;
