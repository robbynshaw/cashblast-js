import { Bill } from "./Bill.js"
import { HasID } from "./HasID.js"

export interface Account extends HasID {
  name: string
  groups?: string[]
  balance?: number
  isAsset?: boolean
  tagList?: string[]
  apr?: number
  compound?: number
  interestRate?: number
  interestDate?: number
  hasInterest?: boolean
  paymentBill?: Bill
  payment?: number
  paymentRecur?: string
  paymentDate?: number
}

export const NullAccount: Account = {
  id: "",
  name: "",
}
