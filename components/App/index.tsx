import { useState } from 'react';
import Diner from '../../toolkit/Diner';
import Expense from '../../toolkit/Expense';
import { exampleDiners, exampleExpenses } from '../../utils/examples';
import DinersList from '../DinersList';
import ExpensesList from '../ExpensesList';
import TipTax from '../TipTax';

function App() {
  // List of expenses/diners
  const [expenses, setExpenses] =
    useState<Expense[]>(exampleExpenses);
  const [diners, setDiners] = useState<Diner[]>(exampleDiners);

  // Selected diner
  const [selectedDiner, setSelectedDiner] = useState<Diner | null>(
    null
  );

  // Tip & tax
  const [tip, setTip] = useState<string>('8.50');
  const [tax, setTax] = useState<string>('12.75');

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

  function handleRemoveExpense(expenseToRemove: Expense) {
    const newDiners = [...diners];
    newDiners.forEach((diner) =>
      diner.removeExpense(expenseToRemove)
    );
    setDiners(newDiners);

    const newExpenses = [...expenses].filter(
      (expense) => expense !== expenseToRemove
    );
    setExpenses(newExpenses);
  }

  function handleRemoveDiner(dinerToRemove: Diner) {
    const newExpenses = [...expenses];
    newExpenses.forEach((expense) =>
      expense.removeDiner(dinerToRemove)
    );
    setExpenses(newExpenses);

    const newDiners = [...diners].filter(
      (diner) => diner !== dinerToRemove
    );
    setDiners(newDiners);
  }

  function calculateSubtotal() {
    return expenses.reduce((prev: number, expense: Expense) => {
      return prev + expense.getCost();
    }, 0);
  }

  function calculateFinalTotal() {
    return calculateSubtotal() + Number(tip) + Number(tax);
  }

  const subtotal = calculateSubtotal();
  const finalTotal = calculateFinalTotal();
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
    tipTaxTotal: Number(tip) + Number(tax),
    subtotal,
    finalTotal,
  };
  const tipTaxProps = {
    tip,
    setTip,
    tax,
    setTax,
    subtotal,
    finalTotal,
  };

  return (
    <div className="flex-col md:flex md:flex-row w-full gap-8">
      <ExpensesList {...expensesListProps} />
      <DinersList {...dinersListProps} />
      <TipTax {...tipTaxProps} />
    </div>
  );
}

export default App;