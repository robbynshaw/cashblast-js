import moment from "moment"
import { Bill } from "../models/Bill"
import { Recurrance } from "../models/Recurrance"
import { Transaction } from "../models/Transaction"
import { ValidationError } from "../models/ValidationError"
import { getNextDate } from "./dateUtil"
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

  if (!creditAccount || !debitAccount) {
    results.push({
      field: "creditAccount|debitAccount",
      error: "each bill must have a creditAccount or a debitAccount",
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
  bills: Bill[],
  start: number,
  end: number
): Transaction[] => {
  const results: Transaction[] = []
  bills.map((bill) => {
    const transactions: Transaction[] = createTransactions(start, end, bill)
    transactions.map((t) => {
      results.push(t)
    })
  })
  return results
}

export const createTransactions = (
  start: number,
  end: number,
  bill: Bill
): Transaction[] => {
  const results: Transaction[] = []
  let firstBill: number = bill.first
  const baseTrans: Transaction = {
    name: bill.name,
    value: bill.value,
    account: bill.creditAccount || bill.debitAccount, // TODO?
    date: firstBill,
    isVerified: false,
  }
  if (bill.recurrance) {
    const recurrance: Recurrance = parseRecurrance(bill.recurrance)

    while (firstBill < start) {
      firstBill = getNextDate(firstBill, recurrance)
    }

    while (firstBill <= end) {
      results.push({ ...baseTrans, date: firstBill })
      firstBill = getNextDate(firstBill, recurrance)
    }
  } else {
    results.push(baseTrans)
  }

  return results
}
