import { validateBill } from "../lib/billUtil.js"
import { filterInvalid } from "../lib/validationUtil.js"
import { Account } from "../models/Account.js"
import { Bill } from "../models/Bill.js"
import { ValidationError } from "../models/ValidationError.js"
import { BillRepo } from "../repos/BillRepo.js"
import {
  BillTypeName,
  MarkdownBillRepo,
} from "../repos/markdown/MarkdownBillRepo.js"

export const validateBills = async (
  rootDir: string,
  accounts: Account[]
): Promise<Bill[]> => {
  let found: boolean = false
  console.log("Validating Bills...\n")
  const billRepo: BillRepo = new MarkdownBillRepo(rootDir)
  let bills: Bill[] = await billRepo.getAll()
  bills = MarkdownBillRepo.resolveAccounts(bills, accounts)

  const validBills: Bill[] = filterInvalid(
    bills,
    validateBill,
    (bill: Bill, errors: ValidationError[]) => {
      found = true
      console.log(`\nError in Bill '${bill.id}'`)
      errors.map((err) => console.log(`\t${err.field}: ${err.error}`))
    }
  )

  if (!found && !validBills.length) {
    console.log(`WARNING: No markdown files were found with any YAML frontmatter containing
---
data_type: ${BillTypeName} 
---
    `)
  } else {
    validBills.map((bill) => console.log(`- Valid Bill: ${bill.name}`))
  }

  return validBills
}
