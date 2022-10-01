import { Account } from "./Account"

export interface Transaction {
  name: string
  value: number
  account: Account
  date: Date
  isVerified: boolean
}
