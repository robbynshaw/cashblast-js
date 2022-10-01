import { Account } from "./Account"
import { HasID } from "./HasID"

export interface Bill extends HasID {
  name: string
  value: number
  recurrance?: string
  first: Date

  creditAccountId?: string
  creditAccount?: Account

  debitAccountId?: string
  debitAccount?: Account
}

export const NullBill: Bill = {
  id: "",
  name: "",
  value: 0,
  first: new Date(),
}
