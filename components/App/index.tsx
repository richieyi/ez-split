import { useState } from 'react';
import Diner from '../../toolkit/Diner';
import Expense from '../../toolkit/Expense';
import { exampleDiners, exampleExpenses } from '../../utils/examples';
import IconButton from '../IconButton';
import Input from '../Input';

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

  function renderExpenses() {
    return expenses.map((expense: Expense) => {
      const isSelected = selectedExpense === expense;
      const isUpdating = expenseToUpdate === expense;

      return (
        <div
          key={expense.getID()}
          className="flex justify-between border rounded p-2 my-2"
        >
          {isUpdating ? (
            <div>
              <form
                onSubmit={handleSaveUpdatedExpense}
                className="flex"
              >
                <Input
                  name="expenseNewName"
                  placeholder="Steak"
                  value={expenseNewName}
                  onChange={(e: any) =>
                    setExpenseNewName(e.target.value)
                  }
                />
                <Input
                  name="expenseNewCost"
                  placeholder="50"
                  value={expenseNewCost}
                  onChange={(e: any) =>
                    setExpenseNewCost(e.target.value)
                  }
                />
              </form>
              <IconButton
                name="check"
                color="green"
                onClick={handleSaveUpdatedExpense}
              />
              <IconButton
                name="x"
                color="red"
                onClick={resetExpenseToUpdate}
              />
            </div>
          ) : (
            <div
              className={isSelected ? 'text-red-500' : ''}
              onClick={() => handleExpenseClick(expense)}
            >
              <span>{expense.getName()}</span>{' '}
              <span>${expense.getCost()}</span>
              <div>
                {expense.getDiners().map((diner) => (
                  <span key={diner.getID()}>{diner.getName()} </span>
                ))}
              </div>
            </div>
          )}
          <div>
            <IconButton
              name="pencil"
              color="blue"
              onClick={() => handleUpdateExpense(expense)}
            />
            <IconButton
              name="trash"
              color="red"
              onClick={() => handleRemoveExpense(expense)}
            />
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
        <div
          key={diner.getID()}
          className="flex justify-between border rounded p-2 my-2"
        >
          {isUpdating ? (
            <form onSubmit={handleSaveUpdatedDiner}>
              <Input
                name="dinerNewName"
                placeholder="John"
                value={dinerNewName}
                onChange={(e: any) => setDinerNewName(e.target.value)}
              />
              <IconButton
                name="check"
                color="green"
                onClick={handleSaveUpdatedDiner}
              />
              <IconButton
                name="x"
                color="red"
                onClick={resetDinerToUpdate}
              />
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
            <IconButton
              name="pencil"
              color="blue"
              onClick={() => handleUpdateDiner(diner)}
            />
            <IconButton
              name="trash"
              color="red"
              onClick={() => handleRemoveDiner(diner)}
            />
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold my-4">Expenses</h1>
        <div>{renderExpenses()}</div>
        {isAddingNewExpense ? (
          <div className="border rounded-sm p-2">
            <form onSubmit={handleAddNewExpense} className="flex">
              <Input
                placeholder="Expense Name"
                name="expense"
                value={expense}
                onChange={(e: any) => setExpense(e.target.value)}
              />
              <Input
                placeholder="Cost"
                name="cost"
                value={cost}
                onChange={(e: any) => setCost(e.target.value)}
              />
            </form>
            <div>
              <IconButton
                name="check"
                color="green"
                onClick={handleAddNewExpense}
              />
              <IconButton
                name="x"
                color="red"
                onClick={resetNewExpense}
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={() => setIsAddingNewExpense(true)}
              className="border rounded-sm p-2"
            >
              Add New Expense
            </button>
          </div>
        )}
      </div>
      <div>
        <h1 className="text-2xl font-bold my-4">Diners</h1>
        <div>{renderDiners()}</div>
        {isAddingNewDiner ? (
          <div className="border rounded-sm p-2">
            <form onSubmit={handleAddNewDiner}>
              <Input
                name="dinerName"
                placeholder="Diner Name"
                value={diner}
                onChange={(e: any) => setDiner(e.target.value)}
              />
            </form>
            <div>
              <IconButton
                name="check"
                color="green"
                onClick={handleAddNewDiner}
              />
              <IconButton
                name="x"
                color="red"
                onClick={resetNewDiner}
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={() => setIsAddingNewDiner(true)}
              className="border rounded-sm p-2"
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
