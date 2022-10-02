import { Account } from "../models/Account.js"
import { Bill } from "../models/Bill.js"

export interface BillRepo {
  getAll(): Promise<Bill[]>
  getForAccount(account: Account): Promise<Bill[]>
}
