import create from 'zustand';
import Expense from '../toolkit/Expense';
import { exampleExpenses } from '../utils/examples';

interface ExpenseStore {
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
  addExpense: (expense: Expense) => void;
  removeExpense: (expense: Expense) => void;
}

export const useExpenseStore = create<ExpenseStore>((set) => ({
  expenses: exampleExpenses,
  setExpenses: (expenses: Expense[]) => set(() => ({ expenses })),
  addExpense: (newExpense) =>
    set((state) => ({ expenses: [...state.expenses, newExpense] })),
  removeExpense: (expenseToRemove: Expense) =>
    set((state) => ({
      expenses: state.expenses.filter(
        (expense) => expense !== expenseToRemove
      ),
    })),
}));
