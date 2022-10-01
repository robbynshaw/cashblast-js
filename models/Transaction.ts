import { Account } from "./Account"
import { HasID } from "./HasID"

export interface Transaction extends HasID {
  name: string
  value: number
  accountId: string
  account: Account
  date: Date
  isVerified: boolean
}
