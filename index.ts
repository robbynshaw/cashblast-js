import { Bill } from "./models/Bill"
import { getValidBills } from "./cli/bills"
import { Account } from "./models/Account"
import { getValidAccounts } from "./cli/accounts"
import { AccountRepo } from "./repos/AccountRepo"
import { MarkdownAccountRepo } from "./repos/markdown/MarkdownAccountRepo"
import { BillRepo } from "./repos/BillRepo"
import { MarkdownBillRepo } from "./repos/markdown/MarkdownBillRepo"
import { CashBlast } from "./CashBlast"
import { ForecastResult } from "./models/ForecastResult"
import moment from "moment"
import { TransactionRepo } from "./repos/TransactionRepo"
import { MarkdownTransactionRepo } from "./repos/markdown/MarkdownTransactionRepo"
import { printForecasts } from "./cli/forecast"
import { argv } from "process"

const run = async () => {
  console.log("💰💥💥 CashBlast 💰💥💥")

  const rootDir: string = "./examples"
  const start: number = new Date("2022-01-01T00:00:00").getTime()
  const end: number = new Date("2023-01-01T00:00:00").getTime()

  // const accounts: Account[] = await getValidAccounts(rootDir)
  // accounts.map((a) => console.log(`Valid Account: ${a.id}`))

  // const bills: Bill[] = await getValidBills(rootDir, accounts)
  // bills.map((b) => console.log(`Valid Bill: ${b.id}`))

  await printForecasts(rootDir, start, end)

  console.log("Dunzo 🏁")
}

run()
