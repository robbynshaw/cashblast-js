import { Transaction } from "./Transaction.js"

export interface BalancedTransaction {
  transaction: Transaction
  balance: number
}
