import { Account } from "./Account"
import { HasID } from "./HasID"

export interface Bill extends HasID {
  name: string
  value: number
  recurrance?: string
  first: number
  creditAccount: Account
  debitAccount?: Account
}
