import { Account } from "../models/Account"

export interface AccountRepo {
  getAll(): Promise<Account[]>
}
