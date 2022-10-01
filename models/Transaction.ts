import { Account } from "./Account"

export interface Transaction {
  name: string
  value: number
  account: Account
  date: number
  isVerified: boolean
}