import Header from '../Header';
import { default as ExpensesSection } from '../Expenses';
import { default as DinersSection } from '../Diners';
import useCustomHook from './useCustomHook';
import NewExpensesList from '../NewExpensesList';
import NewDinersList from '../NewDinersList';

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

  return (
    <>
      <Header />
      <div className="flex-col">
        {/* <ExpensesSection {...expensesProps} />
        <DinersSection {...dinersProps} /> */}
        <NewExpensesList />
        <NewDinersList />
      </div>
    </>
  );
}

export default App;
