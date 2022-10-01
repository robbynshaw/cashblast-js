import { validateBill } from "../lib/billUtil"
import { filterInvalid } from "../lib/validationUtil"
import { Account } from "../models/Account"
import { Bill } from "../models/Bill"
import { ValidationError } from "../models/ValidationError"
import { BillRepo } from "../repos/BillRepo"
import { MarkdownBillRepo } from "../repos/markdown/MarkdownBillRepo"

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
