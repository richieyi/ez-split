import { useState } from 'react';
import Header from '../Header';
import NewExpensesList from '../NewExpensesList';
import NewDinersList from '../NewDinersList';
// import { default as ExpensesSection } from '../Expenses';
// import { default as DinersSection } from '../Diners';
// import useCustomHook from './useCustomHook';

/*
TODO:
- Tip & tax
- Names of diners
  - Allow updating/deleting of diner
- CSS/UX
  - UX for adding expenses
    - Autofocus on input when adding
- Bugs
  - Input bug when editing an expense
  - Updating expense cost doesn't update cost for the diner
*/

function App() {
  return (
    <>
      <Header />
      <div className="flex-col">
        <NewExpensesList />
        <NewDinersList />
      </div>
    </>
  );
}

export default App;

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
