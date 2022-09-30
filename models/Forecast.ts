import { Balance } from "./Balance"
import { BalancedTransaction } from "./BalancedTransaction"

export interface Forecast {
  name: string
  transactions: BalancedTransaction[]
  lowestBalance: Balance
  yearlyBalances: Balance[]
}
