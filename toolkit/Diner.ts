import Expense from './Expense';
import { v4 as uuid } from 'uuid';

class Diner {
  private id: string;
  private name: string;
  private expenses: Expense[];

  constructor(name: string) {
    this.id = uuid();
    this.name = name;
    this.expenses = [];
  }

  public getID(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getExpenses(): Expense[] {
    return this.expenses;
  }

  public addExpense(expense: Expense): this {
    this.expenses.push(expense);
    expense.addDiner(this);
    return this;
  }

  public removeExpense(expenseToRemove: Expense): this {
    console.log('old expenses', this.expenses);
    this.expenses = this.expenses.filter(
      (exp) => exp !== expenseToRemove
    );
    console.log('new expenses', this.expenses);
    expenseToRemove.removeDiner(this);
    return this;
  }
}

export default Diner;
