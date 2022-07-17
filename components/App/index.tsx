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
  console.log('diners', diners);
  console.log('expenses', expenses);

  function handleAddExpense(e: any) {
    e.preventDefault();
    const newExpenses = [...expenses];
    const newExpense = new Expense(expense, Number(cost));
    newExpenses.push(newExpense);
    setExpenses(newExpenses);
    setExpense('');
    setCost('');
  }

  function handleAddDiner(e: any) {
    e.preventDefault();
    const newDiners = [...diners];
    const newDiner = new Diner(diner);
    newDiners.push(newDiner);
    setDiners(newDiners);
    setDiner('');
  }

  function renderExpenses() {
    return expenses.map((expense) => {
      const isSelected = selectedExpense === expense;
      return (
        <div
          key={expense.getID()}
          className="flex justify-between"
          onClick={() => handleAddExpenseToDiner(expense)}
        >
          <div className={isSelected ? 'text-red-500' : ''}>
            <span>{expense.getName()}</span>{' '}
            <span>${expense.getCost()}</span>
          </div>
          <button>Remove</button>
        </div>
      );
    });
  }

  function handleAddExpenseToDiner(expense: Expense) {
    setSelectedExpense(expense);
    selectedDiner?.addExpense(expense);
  }

  function renderDinerTotal(diner: Diner) {
    const total = diner.getExpenses().reduce((prev, curr) => {
      return prev + curr.getCost();
    }, 0);
    return <div>{total}</div>;
  }

  function renderDiners() {
    return diners.map((diner) => {
      const isSelected = selectedDiner === diner;
      return (
        <div
          key={diner.getID()}
          className="flex justify-between"
          onClick={() => setSelectedDiner(diner)}
        >
          <div className={isSelected ? 'text-red-500' : ''}>
            <span>{diner.getName()}</span>
            <span>{renderDinerTotal(diner)}</span>
          </div>
          <div>Remove</div>
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
          <form onSubmit={handleAddExpense}>
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
              onClick={handleAddExpense}
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
          <form onSubmit={handleAddDiner}>
            <input
              className="border"
              placeholder="diner name"
              value={diner}
              onChange={(e) => setDiner(e.target.value)}
            />
            <button className="border" onClick={handleAddDiner}>
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
