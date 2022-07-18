import { useState } from 'react';
import Diner from '../../toolkit/Diner';
import Expense from '../../toolkit/Expense';
import { exampleDiners, exampleExpenses } from '../../utils/examples';
import DinersList from '../DinersList';
import ExpensesList from '../ExpensesList';
import NewDinerForm from '../NewDinerForm';
import NewExpenseForm from '../NewExpenseForm';

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
  const [expenseNewName, setExpenseNewName] = useState<string>('');
  const [expenseNewCost, setExpenseNewCost] = useState<string>('');
  const [dinerToUpdate, setDinerToUpdate] = useState<Diner | null>(
    null
  );
  const [dinerNewName, setDinerNewName] = useState<string>('');

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
    const newExpenses = [...expenses];
    const newExpense = new Expense(expense, Number(cost));
    newExpenses.push(newExpense);
    setExpenses(newExpenses);
    resetNewExpense();
  }

  function resetNewDiner() {
    setDiner('');
    setIsAddingNewDiner(false);
  }

  function handleAddNewDiner(e: any) {
    e.preventDefault();
    const newDiners = [...diners];
    const newDiner = new Diner(diner);
    newDiners.push(newDiner);
    setDiners(newDiners);
    resetNewDiner();
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
    setExpenseNewName(expense.getName());
    setExpenseNewCost(String(expense.getCost()));
  }

  function resetExpenseToUpdate() {
    setExpenseToUpdate(null);
    setExpenseNewName('');
    setExpenseNewCost('');
  }

  function handleSaveUpdatedExpense(e: any) {
    e.preventDefault();

    if (expenseToUpdate) {
      expenseToUpdate.updateExpense(
        expenseNewName,
        Number(expenseNewCost)
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
    setDinerNewName(diner.getName());
  }

  function resetDinerToUpdate() {
    setDinerToUpdate(null);
    setDinerNewName('');
  }

  function handleSaveUpdatedDiner(e: any) {
    e.preventDefault();

    if (dinerToUpdate) {
      dinerToUpdate.updateDiner(dinerNewName);

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
    expenseNewName,
    setExpenseNewName,
    expenseNewCost,
    setExpenseNewCost,
    resetExpenseToUpdate,
    handleExpenseClick,
    handleUpdateExpense,
    handleRemoveExpense,
  };
  const newExpenseFormProps = {
    handleAddNewExpense,
    expense,
    setExpense,
    cost,
    setCost,
    resetNewExpense,
  };

  const newDinerFormProps = {
    handleAddNewDiner,
    diner,
    setDiner,
    resetNewDiner,
  };
  const dinersListProps = {
    diners,
    selectedDiner,
    dinerToUpdate,
    handleSaveUpdatedDiner,
    dinerNewName,
    setDinerNewName,
    resetDinerToUpdate,
    setSelectedDiner,
    handleUpdateDiner,
    handleRemoveDiner,
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold my-4">Expenses</h1>
        <div>
          <ExpensesList {...expensesListProps} />
        </div>
        {isAddingNewExpense ? (
          <NewExpenseForm {...newExpenseFormProps} />
        ) : (
          <div className="flex justify-center">
            <button
              onClick={() => setIsAddingNewExpense(true)}
              className="border rounded p-2"
            >
              Add New Expense
            </button>
          </div>
        )}
      </div>
      <div>
        <h1 className="text-2xl font-bold my-4">Diners</h1>
        <div>
          <DinersList {...dinersListProps} />
        </div>
        {isAddingNewDiner ? (
          <NewDinerForm {...newDinerFormProps} />
        ) : (
          <div className="flex justify-center">
            <button
              onClick={() => setIsAddingNewDiner(true)}
              className="border rounded p-2"
            >
              Add New Diner
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
