import { validateBill } from "./lib/billUtil"
import { findFilesByType } from "./lib/fileUtil"
import { Bill } from "./models/Bill"
import { ValidationError } from "./models/ValidationError"
import { BillRepo } from "./repos/BillRepo"
import { MarkdownBillRepo } from "./repos/markdown/MarkdownBillRepo"

const run = async () => {
  console.log("💰💥💥 CashBlast 💰💥💥")

  // const billFiles: string[] = await findFilesByType(`./examples`, 'CashBlast.Bill')
  // billFiles.map(bf => console.log(`BILL FOUND: ${bf}`))

  const billRepo: BillRepo = new MarkdownBillRepo("./examples")
  const bills: Bill[] = await billRepo.getAll()
  bills.map((bill) => {
    const errors: ValidationError[] = validateBill(bill)
    if (errors.length) {
      console.log(`\nError in '${bill.id}'`)
      errors.map((err) => console.log(`\t${err.field}: ${err.error}`))
    }
  })

  console.log("Dunzo 🏁")
}

run()
