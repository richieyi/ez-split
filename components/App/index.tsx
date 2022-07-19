import { useState } from 'react';
import Diner from '../../toolkit/Diner';
import Expense from '../../toolkit/Expense';
import { exampleDiners, exampleExpenses } from '../../utils/examples';
import DinersList from '../DinersList';
import ExpensesList from '../ExpensesList';
import DinerForm from '../DinerForm';
import ExpenseForm from '../ExpenseForm';
import NewItemButton from '../NewItemButton';

function App() {
  // List of expenses/diners
  const [expenses, setExpenses] =
    useState<Expense[]>(exampleExpenses);
  const [diners, setDiners] = useState<Diner[]>(exampleDiners);

  // Inputs for new expense/diner
  const [isAddingNewExpense, setIsAddingNewExpense] =
    useState<boolean>(false);
  const [isAddingNewDiner, setIsAddingNewDiner] =
    useState<boolean>(false);
  const [expense, setExpense] = useState<string>('');
  const [cost, setCost] = useState<string>('');
  const [diner, setDiner] = useState<string>('');

  // Inputs for updating expense/diner
  const [expenseToUpdate, setExpenseToUpdate] =
    useState<Expense | null>(null);
  const [expenseUpdatedName, setExpenseUpdatedName] =
    useState<string>('');
  const [expenseUpdatedCost, setExpenseUpdatedCost] =
    useState<string>('');
  const [dinerToUpdate, setDinerToUpdate] = useState<Diner | null>(
    null
  );
  const [dinerUpdatedName, setDinerUpdatedName] =
    useState<string>('');

  // Selected expense/diner
  const [selectedExpense, setSelectedExpense] =
    useState<Expense | null>(null);
  const [selectedDiner, setSelectedDiner] = useState<Diner | null>(
    null
  );

  function resetNewExpense() {
    setExpense('');
    setCost('');
    setIsAddingNewExpense(false);
  }

  function handleAddNewExpense(e: any) {
    e.preventDefault();

    if (expense.length > 0 && cost.length > 0) {
      const newExpenses = [...expenses];
      const newExpense = new Expense(expense, Number(cost));
      newExpenses.push(newExpense);
      setExpenses(newExpenses);
      resetNewExpense();
    }
  }

  function resetNewDiner() {
    setDiner('');
    setIsAddingNewDiner(false);
  }

  function handleAddNewDiner(e: any) {
    e.preventDefault();

    if (diner.length > 0) {
      const newDiners = [...diners];
      const newDiner = new Diner(diner);
      newDiners.push(newDiner);
      setDiners(newDiners);
      resetNewDiner();
    }
  }

  function handleExpenseClick(expense: Expense) {
    setSelectedExpense(expense);

    if (selectedDiner) {
      // if expense does exist in diner's expenses -> remove expense
      if (
        selectedDiner.getExpenses().find((exp) => exp === expense)
      ) {
        selectedDiner.removeExpense(expense);
        // if expense does not exist in diner's expenses -> add expense
      } else {
        selectedDiner.addExpense(expense);
      }

      const newDiners = [...diners];
      const idx = newDiners.findIndex(
        (diner) => diner.getID() === selectedDiner.getID()
      );
      newDiners.splice(idx, 1, selectedDiner);
      setDiners(newDiners);
    }
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

  function handleUpdateExpense(expense: Expense) {
    setExpenseToUpdate(expense);
    setExpenseUpdatedName(expense.getName());
    setExpenseUpdatedCost(String(expense.getCost()));
  }

  function resetExpenseToUpdate() {
    setExpenseToUpdate(null);
    setExpenseUpdatedName('');
    setExpenseUpdatedCost('');
  }

  function handleSaveUpdatedExpense(e: any) {
    e.preventDefault();

    if (
      expenseToUpdate &&
      expenseUpdatedName.length > 0 &&
      expenseUpdatedCost.length > 0
    ) {
      expenseToUpdate.updateExpense(
        expenseUpdatedName,
        Number(expenseUpdatedCost)
      );

      const newExpenses = [...expenses];
      const idx = newExpenses.findIndex(
        (expense: any) => expense.getID() === expenseToUpdate.getID()
      );
      newExpenses.splice(idx, 1, expenseToUpdate);
      setExpenses(newExpenses);
      resetExpenseToUpdate();
    }
  }

  function handleUpdateDiner(diner: Diner) {
    setDinerToUpdate(diner);
    setDinerUpdatedName(diner.getName());
  }

  function resetDinerToUpdate() {
    setDinerToUpdate(null);
    setDinerUpdatedName('');
  }

  function handleSaveUpdatedDiner(e: any) {
    e.preventDefault();

    if (dinerToUpdate && dinerUpdatedName.length > 0) {
      dinerToUpdate.updateDiner(dinerUpdatedName);

      const newDiners = [...diners];
      const idx = newDiners.findIndex(
        (diner) => diner.getID() === dinerToUpdate.getID()
      );
      newDiners.splice(idx, 1, dinerToUpdate);
      setDiners(newDiners);
      resetDinerToUpdate();
    }
  }

  const expensesListProps = {
    expenses,
    selectedExpense,
    expenseToUpdate,
    handleSaveUpdatedExpense,
    expenseUpdatedName,
    handleExpenseNameChange: setExpenseUpdatedName,
    expenseUpdatedCost,
    handleExpenseCostChange: setExpenseUpdatedCost,
    resetExpenseToUpdate,
    handleExpenseClick,
    handleUpdateExpense,
    handleRemoveExpense,
  };
  const newExpenseFormProps = {
    handleSaveExpense: handleAddNewExpense,
    expense,
    handleExpenseNameChange: setExpense,
    cost,
    handleExpenseCostChange: setCost,
    handleCancelExpense: resetNewExpense,
  };

  const dinersListProps = {
    diners,
    selectedDiner,
    dinerToUpdate,
    handleSaveUpdatedDiner,
    dinerUpdatedName,
    handleDinerNameChange: setDinerUpdatedName,
    resetDinerToUpdate,
    setSelectedDiner,
    handleUpdateDiner,
    handleRemoveDiner,
  };
  const newDinerFormProps = {
    handleSaveDiner: handleAddNewDiner,
    diner,
    handleDinerNameChange: setDiner,
    handelCancelDiner: resetNewDiner,
  };

  return (
    <>
      <h1 className="text-center text-4xl font-bold my-4">
        EZ Split ✔️
      </h1>
      <div className="flex-col md:flex md:flex-row w-full gap-8">
        <div className="flex-1">
          <h1 className="text-2xl font-bold my-4 md:text-center text-left">
            Expenses 🍖
          </h1>
          <ExpensesList {...expensesListProps} />
          {isAddingNewExpense ? (
            <div className="border rounded p-2 bg-white">
              <ExpenseForm {...newExpenseFormProps} />
            </div>
          ) : (
            <NewItemButton
              setIsAddingNewItem={() => setIsAddingNewExpense(true)}
              itemType="Expense"
            />
          )}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold my-4 md:text-center text-left">
            Diners 🧑‍🍳
          </h1>
          <DinersList {...dinersListProps} />
          {isAddingNewDiner ? (
            <div className="border rounded p-2 bg-white">
              <DinerForm {...newDinerFormProps} />
            </div>
          ) : (
            <NewItemButton
              setIsAddingNewItem={() => setIsAddingNewDiner(true)}
              itemType="Diner"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;