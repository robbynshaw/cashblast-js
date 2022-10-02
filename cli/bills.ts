import { validateBill } from "../lib/billUtil.js"
import { filterInvalid } from "../lib/validationUtil.js"
import { Account } from "../models/Account.js"
import { Bill } from "../models/Bill.js"
import { ValidationError } from "../models/ValidationError.js"
import { BillRepo } from "../repos/BillRepo.js"
import { MarkdownBillRepo } from "../repos/markdown/MarkdownBillRepo.js"

export const getValidBills = async (
  rootDir: string,
  accounts: Account[]
): Promise<Bill[]> => {
  const billRepo: BillRepo = new MarkdownBillRepo(rootDir)
  let bills: Bill[] = await billRepo.getAll()
  bills = MarkdownBillRepo.resolveAccounts(bills, accounts)

  const validBills: Bill[] = filterInvalid(
    bills,
    validateBill,
    (bill: Bill, errors: ValidationError[]) => {
      console.log(`\nError in Bill '${bill.id}'`)
      errors.map((err) => console.log(`\t${err.field}: ${err.error}`))
    }
  )

  return validBills
}
