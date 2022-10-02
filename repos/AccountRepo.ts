import { Account } from "../models/Account.js"

export interface AccountRepo {
  getAll(): Promise<Account[]>
}
