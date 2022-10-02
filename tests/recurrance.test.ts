import { RRule } from "rrule"
import { parseRecurrance } from "../lib/recurranceUtil.js"

const recur: RRule = parseRecurrance("every 365 days")
recur.options.dtstart = new Date("2022-09-09")
const all: Date[] = recur.between(
  new Date("2022-08-13"),
  new Date("2025-10-15")
)
console.log("DATES", all)
