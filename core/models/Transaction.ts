import { Account } from "./Account.js"
import { HasID } from "./HasID.js"

export interface Transaction extends HasID {
  name: string
  value: number
  accountId: string
  account: Account
  date: Date
  isVerified: boolean
  memo?: string
  fitid?: string
  importedBalance?: number
}
