import { ValidationError } from "../models/ValidationError.js"
import pkg from "rrule"

const { RRule } = pkg

export const validateRecurrance = (
  recurrance: string
): ValidationError | null => {
  return null // TODO
}

export const parseRecurrance = (recurrance: string): pkg.RRule => {
  const recur: pkg.RRule = RRule.fromText(recurrance)
  return recur
}
