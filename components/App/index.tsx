import { useState } from 'react';
import Diner from '../../toolkit/Diner';
import Expense from '../../toolkit/Expense';
import { exampleDiners, exampleExpenses } from '../../utils/examples';
// import Header from '../Header';
// import NewExpensesList from '../NewExpensesList';
// import NewDinersList from '../NewDinersList';
// import { default as ExpensesSection } from '../Expenses';
// import { default as DinersSection } from '../Diners';
// import useCustomHook from './useCustomHook';

function App() {
  const [expenses, setExpenses] =
    useState<Expense[]>(exampleExpenses);
  const [diners, setDiners] = useState<Diner[]>(exampleDiners);

  const [diner, setDiner] = useState<string>('');
  const [expense, setExpense] = useState<string>('');
  const [cost, setCost] = useState<string>('');

  const [selectedExpense, setSelectedExpense] =
    useState<Expense | null>(null);
  const [selectedDiner, setSelectedDiner] = useState<Diner | null>(
    null
  );
  // console.log('diners', diners);
  // console.log('expenses', expenses);

  function handleAddNewExpense(e: any) {
    e.preventDefault();
    const newExpenses = [...expenses];
    const newExpense = new Expense(expense, Number(cost));
    newExpenses.push(newExpense);
    setExpenses(newExpenses);
    setExpense('');
    setCost('');
  }

  function handleAddNewDiner(e: any) {
    e.preventDefault();
    const newDiners = [...diners];
    const newDiner = new Diner(diner);
    newDiners.push(newDiner);
    setDiners(newDiners);
    setDiner('');
  }

  function handleExpenseClick(expense: Expense) {
    setSelectedExpense(expense);

    if (selectedDiner) {
      // if expense does exist -> remove expense
      if (
        selectedDiner.getExpenses().find((exp) => exp === expense)
      ) {
        selectedDiner.removeExpense(expense);
        // if expense does not exist in diner's expenses -> add expense
      } else {
        selectedDiner?.addExpense(expense);
      }
      const newDiners = [...diners];
      const idx = newDiners.findIndex(
        (diner) => diner.getID() === selectedDiner?.getID()
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

  function renderExpenses() {
    return expenses.map((expense) => {
      const isSelected = selectedExpense === expense;
      return (
        <div key={expense.getID()} className="flex justify-between">
          <div
            className={isSelected ? 'text-red-500' : ''}
            onClick={() => handleExpenseClick(expense)}
          >
            <span>{expense.getName()}</span>{' '}
            <span>${expense.getCost()}</span>
          </div>
          <button onClick={() => handleRemoveExpense(expense)}>
            Remove
          </button>
        </div>
      );
    });
  }

  function renderDinerTotal(diner: Diner) {
    const total = diner.getExpenses().reduce((prev, curr) => {
      return prev + curr.getCostPerDiner();
    }, 0);
    return total;
  }

  function renderDiners() {
    return diners.map((diner, idx) => {
      const isSelected = selectedDiner === diner;
      return (
        <div key={diner.getID()} className="flex justify-between">
          <div
            className={isSelected ? 'text-red-500' : ''}
            onClick={() => setSelectedDiner(diner)}
          >
            <span>{diner.getName()}</span>{' '}
            <span>${renderDinerTotal(diner)}</span>
          </div>
          <button onClick={() => handleRemoveDiner(diner)}>
            Remove
          </button>
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

// function App() {
//   return (
//     <>
//       <Header />
//       <div className="flex-col">
//         <NewExpensesList />
//         <NewDinersList />
//       </div>
//     </>
//   );
// }
// const {
//   expenses,
//   setExpenses,
//   diners,
//   setDiners,
//   activeDiner,
//   setActiveDiner,
//   handleSetAsignee,
// } = useCustomHook();

// const expensesProps = {
//   expenses,
//   setExpenses,
//   diners,
//   setDiners,
//   activeDiner,
//   handleSetAsignee,
// };
// const dinersProps = {
//   diners,
//   setDiners,
//   activeDiner,
//   setActiveDiner,
// };
