import Expense from '../toolkit/Expense';
import Diner from '../toolkit/Diner';

const expense1 = new Expense('🐔 Chicken', 15);
const expense2 = new Expense('🥩 Steak', 40);
const expense3 = new Expense('🥗 Salad', 10);
const expense4 = new Expense('🍹 Drink', 20);

const diner1 = new Diner('👨 Yoru');
const diner2 = new Diner('👩 Jett');
const diner3 = new Diner('👩 Sage');
const diner4 = new Diner('👨 Sova');
export const exampleExpenses = [
  expense1,
  expense2,
  expense3,
  expense4,
];
export const exampleDiners = [diner1, diner2, diner3, diner4];
