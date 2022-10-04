import { Account } from "../models/Account.js"

export interface AccountRepo {
  getAll(): Promise<Account[]>
  getByID(id: string): Promise<Account | null>
}
