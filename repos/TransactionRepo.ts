import { Account } from "../models/Account"
import { Transaction } from "../models/Transaction"

export interface TransactionRepo {
  getAll(): Promise<Transaction[]>
  getForAccount(account: Account): Promise<Transaction[]>
}
