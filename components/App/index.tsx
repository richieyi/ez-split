import exp from 'constants';
import { useState } from 'react';
import Diner from '../../toolkit/Diner';
import Expense from '../../toolkit/Expense';
import { exampleDiners, exampleExpenses } from '../../utils/examples';

function App() {
  // List of expenses/diners
  const [expenses, setExpenses] =
    useState<Expense[]>(exampleExpenses);
  const [diners, setDiners] = useState<Diner[]>(exampleDiners);
  console.log('exp', expenses);
  console.log('din', diners);
  console.log('---------');

  // Inputs for new expense/diner
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

  function handleAddNewExpense(e: any) {
    e.preventDefault();
    const newExpenses = [...expenses];
    const newExpense = new Expense(expense, Number(cost));
    newExpenses.push(newExpense);
    setExpenses(newExpenses);

    // Reset input
    setExpense('');
    setCost('');
  }

  function handleAddNewDiner(e: any) {
    e.preventDefault();
    const newDiners = [...diners];
    const newDiner = new Diner(diner);
    newDiners.push(newDiner);
    setDiners(newDiners);

    // Reset input
    setDiner('');
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

  function renderExpenses() {
    return expenses.map((expense: Expense) => {
      const isSelected = selectedExpense === expense;
      const isUpdating = expenseToUpdate === expense;

      return (
        <div key={expense.getID()} className="flex justify-between">
          {isUpdating ? (
            <form onSubmit={handleSaveUpdatedExpense}>
              <input
                className="border"
                value={expenseNewName}
                onChange={(e) => setExpenseNewName(e.target.value)}
              />
              <input
                className="border"
                value={expenseNewCost}
                onChange={(e) => setExpenseNewCost(e.target.value)}
              />
              <button
                className="border"
                onClick={handleSaveUpdatedExpense}
              >
                Save
              </button>
              <button
                className="border"
                onClick={resetExpenseToUpdate}
              >
                Cancel
              </button>
            </form>
          ) : (
            <div
              className={isSelected ? 'text-red-500' : ''}
              onClick={() => handleExpenseClick(expense)}
            >
              <span>{expense.getName()}</span>{' '}
              <span>${expense.getCost()}</span>
            </div>
          )}
          <div>
            <button
              className="border"
              onClick={() => handleUpdateExpense(expense)}
            >
              Update
            </button>
            <button
              className="border"
              onClick={() => handleRemoveExpense(expense)}
            >
              Remove
            </button>
          </div>
        </div>
      );
    });
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

  function renderDiners() {
    return diners.map((diner: Diner) => {
      const isSelected = selectedDiner === diner;
      const isUpdating = dinerToUpdate === diner;

      return (
        <div key={diner.getID()} className="flex justify-between">
          {isUpdating ? (
            <form onSubmit={handleSaveUpdatedDiner}>
              <input
                className="border"
                value={dinerNewName}
                onChange={(e) => setDinerNewName(e.target.value)}
              />
              <button
                className="border"
                type="submit"
                onClick={handleSaveUpdatedDiner}
              >
                Save
              </button>
              <button className="border" onClick={resetDinerToUpdate}>
                Cancel
              </button>
            </form>
          ) : (
            <div
              className={isSelected ? 'text-red-500' : ''}
              onClick={() => setSelectedDiner(diner)}
            >
              <span>{diner.getName()}</span>{' '}
              <span>${diner.getTotalExpenses()}</span>
            </div>
          )}
          <div>
            <button
              className="border"
              onClick={() => handleUpdateDiner(diner)}
            >
              Update
            </button>
            <button
              className="border"
              onClick={() => handleRemoveDiner(diner)}
            >
              Remove
            </button>
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <div>
        <h1>--- Expenses ---</h1>
        <div>{renderExpenses()}</div>
        <div>
          <form onSubmit={handleAddNewExpense}>
            <input
              className="border"
              placeholder="expense name"
              value={expense}
              onChange={(e) => setExpense(e.target.value)}
            />
            <input
              className="border"
              placeholder="cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
            <button
              type="submit"
              className="border"
              onClick={handleAddNewExpense}
            >
              Add Expense
            </button>
          </form>
        </div>
      </div>
      <div>
        <h1>--- Diners ---</h1>
        <div>{renderDiners()}</div>
        <div>
          <form onSubmit={handleAddNewDiner}>
            <input
              className="border"
              placeholder="diner name"
              value={diner}
              onChange={(e) => setDiner(e.target.value)}
            />
            <button className="border" onClick={handleAddNewDiner}>
              Add Diner
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
