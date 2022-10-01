import moment from "moment"
import { RRule } from "rrule"
import { Account, NullAccount } from "../models/Account"
import { Bill } from "../models/Bill"
import { Transaction } from "../models/Transaction"
import { ValidationError } from "../models/ValidationError"
import { parseRecurrance, validateRecurrance } from "./recurranceUtil"

const requiredError = (name: string): ValidationError => ({
  field: name,
  error: `'${name}' is a required field`,
})

export const validateBill = (bill: Bill): ValidationError[] => {
  const results: ValidationError[] = []
  const { name, value, creditAccount, debitAccount, recurrance, first } = bill

  if (!name || !name.trim()) {
    results.push(requiredError("name"))
  }

  if (!value) {
    results.push(requiredError("value"))
  }

  if (!first) {
    results.push(requiredError("first"))
  }

  if (!moment(first)) {
    results.push({
      field: "first",
      error: '"first" is not a valid date',
    })
  }

  if (!creditAccount && !debitAccount) {
    results.push({
      field: "creditAccountId|debitAccountId",
      error: "each bill must have a creditAccountId or a debitAccountId",
    })
  }

  if (recurrance) {
    const err: ValidationError | null = validateRecurrance(recurrance)
    if (err) {
      results.push(err)
    }
  }

  return results
}

export const createAllTransactions = (
  account: Account,
  bills: Bill[],
  start: number,
  end: number
): Transaction[] => {
  const results: Transaction[] = []
  bills.map((bill) => {
    const transactions: Transaction[] = createTransactions(
      account,
      start,
      end,
      bill
    )
    transactions.map((t) => {
      results.push(t)
    })
  })
  return results
}

export const createTransactions = (
  account: Account,
  start: number,
  end: number,
  bill: Bill
): Transaction[] => {
  const results: Transaction[] = []
  let firstBill: Date = bill.first
  let isDebit: boolean = true
  if (account.id === bill.creditAccountId) {
    isDebit = false
  }

  const baseTrans: Transaction = {
    name: bill.name,
    value: isDebit ? -bill.value : bill.value,
    account: account,
    date: firstBill,
    isVerified: false,
  }
  if (bill.recurrance) {
    const recurrance: RRule = parseRecurrance(bill.recurrance)
    recurrance.options.dtstart = firstBill
    const dates: Date[] = recurrance.between(
      new Date(start),
      new Date(end),
      true
    )

    dates.map((dt) => {
      results.push({ ...baseTrans, date: dt })
    })
  } else if (
    baseTrans.date >= new Date(start) &&
    baseTrans.date <= new Date(end)
  ) {
    results.push(baseTrans)
  }

  return results
}
