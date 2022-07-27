import Expense from '../toolkit/Expense';

export function isValidAmount(val: string): boolean {
  const regex =
    /"^\$?\-?([1-9]{1}[0-9]{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))$|^\-?\$?([1-9]{1}\d{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))$|^\(\$?([1-9]{1}\d{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))\)$"/;

  /*
    Regex found here: https://stackoverflow.com/a/354276
    Prevent dollar sign
    */

  return !val.search(regex);
}

export function calculateSubtotal(expenses: Expense[]) {
  return expenses.reduce((prev: number, expense: Expense) => {
    return prev + expense.getCost();
  }, 0);
}
