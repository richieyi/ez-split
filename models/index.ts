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
}

class Expense {
  private name: string;
  private cost: number;
  private costPerDiner: number = 0;
  private diners: Diner[] = [];

  constructor(name: string, cost: number) {
    this.name = name;
    this.cost = cost;
    this.diners = [];
  }

  public getCostPerDiner(): number {
    return this.costPerDiner;
  }

  public addDiner(diner: Diner): this {
    this.diners.push(diner);
    this.updateCostPerDiner();
    return this;
  }

  public updateCostPerDiner(): void {
    const dinerCount = this.diners.length;
    this.costPerDiner = Number((this.cost / dinerCount).toFixed(2));
  }
}

class Bill {
  private name: string;
  private expenses: Expense[];
  private diners: Diner[];

  constructor(name: string) {
    this.name = name;
    this.expenses = [];
    this.diners = [];
  }

  public setDiners(diners: Diner[]): this {
    this.diners = diners;
    return this;
  }

  public setExpenses(expenses: Expense[]): this {
    this.expenses = expenses;
    return this;
  }

  public calculatePerPerson(): [string, number][] {
    const out = this.diners.map((diner): [string, number] => {
      const expenses = diner.getExpenses();
      const total = expenses.reduce((accum, expense) => {
        const cost = expense.getCostPerDiner();
        return accum + cost;
      }, 0);

      return [diner.getName(), total];
    });

    return out;
  }
}

const DINERS = ['Dylan', 'Richie', 'Jasmine', 'Christine'];
const FOOD = [
  { name: 'chicken', cost: 10 },
  { name: 'steak', cost: 50 },
  { name: 'salad', cost: 10 },
  { name: 'potatoes', cost: 5 },
];

function main() {
  const [Dylan, Richie] = DINERS.map((diner) => new Diner(diner));
  const expenses = FOOD.map(
    ({ name, cost }) => new Expense(name, cost)
  );
  const [chicken, steak, salad, potatoes] = expenses;

  const bill = new Bill('Mortons')
    .setDiners([Dylan, Richie])
    .setExpenses(expenses);

  Dylan.addExpense(chicken).addExpense(salad);

  Richie.addExpense(steak).addExpense(potatoes).addExpense(salad);

  const out = bill.calculatePerPerson();

  console.log(out);
  return out;
}

// main();

// export { Diner, Expense, Bill };
export default main;
