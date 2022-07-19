import { useState } from 'react';
import Diner from '../../toolkit/Diner';
import Expense from '../../toolkit/Expense';
import { exampleDiners, exampleExpenses } from '../../utils/examples';
import DinersList from '../DinersList';
import ExpensesList from '../ExpensesList';

function App() {
  // List of expenses/diners
  const [expenses, setExpenses] =
    useState<Expense[]>(exampleExpenses);
  const [diners, setDiners] = useState<Diner[]>(exampleDiners);

  // Selected expense/diner
  const [selectedExpense, setSelectedExpense] =
    useState<Expense | null>(null);
  const [selectedDiner, setSelectedDiner] = useState<Diner | null>(
    null
  );

  // When diner is selected and expense is clicked
  function handleExpenseClick(expense: Expense) {
    setSelectedExpense(expense);

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

  const expensesListProps = {
    expenses,
    selectedExpense,
    handleExpenseClick,
    handleRemoveExpense,
    setExpenses,
  };
  const dinersListProps = {
    diners,
    selectedDiner,
    setSelectedDiner,
    handleRemoveDiner,
    setDiners,
  };

  return (
    <div className="flex-col md:flex md:flex-row w-full gap-8">
      <ExpensesList {...expensesListProps} />
      <DinersList {...dinersListProps} />
    </div>
  );
}

export default App;