import { validateBill } from "../lib/billUtil"
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
  console.log("Bills", bills)

  const validBills: Bill[] = bills
    .map((bill) => {
      const errors: ValidationError[] = validateBill(bill)
      if (errors.length) {
        console.log(`\nError in Bill '${bill.id}'`)
        errors.map((err) => console.log(`\t${err.field}: ${err.error}`))
        return { bill, valid: false }
      } else {
        return { bill, valid: true }
      }
    })
    .filter((bill) => bill.valid)
    .map((b) => b.bill)

  return validBills
}
