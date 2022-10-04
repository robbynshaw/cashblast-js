import { Transaction } from "../models/Transaction.js"
import { ValidationError } from "../models/ValidationError.js"
import { requiredError } from "./validationUtil.js"

export const validateTransaction = (trans: Transaction): ValidationError[] => {
  const results: ValidationError[] = []
  const { date, name, value, account } = trans

  if (!name || !name.trim()) {
    results.push(requiredError("name"))
  }

  if (!value) {
    results.push(requiredError("value"))
  }

  if (!date) {
    results.push(requiredError("date"))
  }

  if (!account) {
    results.push({
      field: "accountId",
      error: "each transaction must have a valid accountId",
    })
  }

  return results
}
