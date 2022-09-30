import { Transaction } from "./Transaction"

export interface BalancedTransaction {
  transaction: Transaction
  balance: number
}
