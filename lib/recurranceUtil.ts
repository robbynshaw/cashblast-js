import { ValidationError } from "../models/ValidationError"
import { RRule } from "rrule"

export const validateRecurrance = (
  recurrance: string
): ValidationError | null => {
  return null // TODO
}

export const parseRecurrance = (recurrance: string): RRule => {
  const recur: RRule = RRule.fromText(recurrance)
  return recur
}
