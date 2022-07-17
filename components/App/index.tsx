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

  const [selectedDiner, setSelectedDiner] = useState<Diner | null>(
    null
  );

  function renderExpenses() {
    return expenses.map((expense) => (
      <div key={expense.getID()}>
        <span>{expense.getName()}</span>{' '}
        <span>${expense.getCost()}</span>
      </div>
    ));
  }

  function renderDiners() {
    return diners.map((diner) => {
      const isSelected = selectedDiner === diner;
      return (
        <div
          key={diner.getID()}
          className={isSelected ? 'text-red-500' : ''}
          onClick={() => setSelectedDiner(diner)}
        >
          {diner.getName()}
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
          <button className="border">Add</button>
        </div>
      </div>
      <div>
        <h1>--- Diners ---</h1>
        <div>{renderDiners()}</div>
        <div>
          <input
            className="border"
            placeholder="diner name"
            value={diner}
            onChange={(e) => setDiner(e.target.value)}
          />
          <button className="border">Add</button>
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
