import { Bill } from "./Bill"

export interface Account {
  groups: string[]
  number: number
  name: string
  balance: number
  balanceData: any
  billList: any
  isAsset: boolean
  tagList: string[]
  apr: number
  compound: number
  interestRate: number
  interestDate: number
  hasInterest: boolean
  paymentBill: Bill
  payment: number
  paymentRecur: number
  paymentDate: number
  hasPayment: boolean
  hasSnowball: boolean
}
