import Diner from './Diner';
import { v4 as uuid } from 'uuid';

class Expense {
  private id: string;
  private name: string;
  private cost: number;
  private costPerDiner: number = 0;
  private diners: Diner[];

  constructor(name: string, cost: number) {
    this.id = uuid();
    this.name = name;
    this.cost = cost;
    this.diners = [];
  }

  public getID(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getCost(): number {
    return this.cost;
  }

  public getDiners(): Diner[] {
    return this.diners;
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
    this.costPerDiner = this.cost / dinerCount;
  }
}

export default Expense;
