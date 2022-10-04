import { Balance } from "./Balance.js"
import { BalancedTransaction } from "./BalancedTransaction.js"

export interface Forecast {
  name: string
  transactions: BalancedTransaction[]
  lowestBalance: Balance
  yearlyBalances: Balance[]
}
