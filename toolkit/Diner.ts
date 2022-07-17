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

  public removeExpense(expense: Expense): this {
    this.expenses.find((exp) => exp.getName() === expense.getName());
    return this;
  }
}

export default Diner;
