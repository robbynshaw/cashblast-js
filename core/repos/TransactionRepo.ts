import { Account } from "../models/Account.js"
import { Transaction } from "../models/Transaction.js"

export interface TransactionRepo {
  getAll(): Promise<Transaction[]>
  getForAccount(account: Account): Promise<Transaction[]>
  saveAll(transactions: Transaction[]): Promise<void>
}
