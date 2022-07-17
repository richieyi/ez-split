import Expense from '../toolkit/Expense';
import Diner from '../toolkit/Diner';

const expense1 = new Expense('Chicken', 15);
const expense2 = new Expense('Steak', 10);
const expense3 = new Expense('Salad', 10);
const expense4 = new Expense('Potatoes', 5);

const diner1 = new Diner('John');
const diner2 = new Diner('Jane');
const diner3 = new Diner('Jill');
const diner4 = new Diner('Joe');
export const exampleExpenses = [
  expense1,
  expense2,
  expense3,
  expense4,
];
export const exampleDiners = [diner1, diner2, diner3, diner4];

// import { v4 as uuid } from 'uuid';

// const expense1 = {
//   id: uuid(),
//   name: 'Chicken',
//   cost: 10,
//   diners: [],
// };
// const expense2 = {
//   id: uuid(),
//   name: 'Steak',
//   cost: 50,
//   diners: [],
// };
// const expense3 = {
//   id: uuid(),
//   name: 'Salad',
//   cost: 10,
//   diners: [],
// };
// const expense4 = {
//   id: uuid(),
//   name: 'Potatoes',
//   cost: 5,
//   diners: [],
// };
// const diner1 = {
//   id: uuid(),
//   name: 'John',
//   expenses: [],
// };
// const diner2 = {
//   id: uuid(),
//   name: 'Jane',
//   expenses: [],
// };
// const diner3 = {
//   id: uuid(),
//   name: 'Jill',
//   expenses: [],
// };
// const diner4 = {
//   id: uuid(),
//   name: 'Jack',
//   expenses: [],
// };

// export const exampleExpenses = [
//   expense1,
//   expense2,
//   expense3,
//   expense4,
// ];
// export const exampleDiners = [diner1, diner2, diner3, diner4];
