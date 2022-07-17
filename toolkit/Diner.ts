import Expense from './Expense';

class Diner {
  private name: string;
  private expenses: Expense[];

  constructor(name: string) {
    this.name = name;
    this.expenses = [];
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
