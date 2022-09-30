import { Account } from "../models/Account"
import { Bill } from "../models/Bill"

export interface BillRepo {
  getAll(): Promise<Bill[]>
  getForAccount(account: Account): Promise<Bill[]>
}
