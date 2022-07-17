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

  public updateDiner(newName: string): void {
    this.name = newName;
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
    this.expenses = this.expenses.filter(
      (exp) => exp !== expenseToRemove
    );
    expenseToRemove.removeDiner(this);
    return this;
  }

  // public updateExpense(expenseToUpdate: Expense): this {
  //   console.log('here', this.expenses);
  //   const idx = this.expenses.findIndex(
  //     (expense) => expense.getID() === expenseToUpdate.getID()
  //   );
  //   if (idx >= 0) {
  //     this.expenses.splice(idx, 1, expenseToUpdate);
  //   }
  //   return this;
  // }

  public getTotalExpenses(): number {
    const total = this.getExpenses().reduce((prev, curr) => {
      return prev + curr.getCostPerDiner();
    }, 0);
    return total;
  }
}

export default Diner;
