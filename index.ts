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

const run = async () => {
  console.log("💰💥💥 CashBlast 💰💥💥")

  const rootDir: string = "./examples"
  const start: number = new Date("2022-01-01T00:00:00").getTime()
  const end: number = new Date("2023-01-01T00:00:00").getTime()

  // const accounts: Account[] = await getValidAccounts(rootDir)
  // accounts.map((a) => console.log(`Valid Account: ${a.id}`))

  // const bills: Bill[] = await getValidBills(rootDir, accounts)
  // bills.map((b) => console.log(`Valid Bill: ${b.id}`))

  const accountRepo: AccountRepo = new MarkdownAccountRepo(rootDir)
  const billRepo: BillRepo = new MarkdownBillRepo(rootDir)
  const cb: CashBlast = new CashBlast(accountRepo, billRepo)

  const forecasts: ForecastResult[] = await cb.forecastAll(start, end)
  forecasts.map((fcresult) => {
    const { account, forecast } = fcresult
    const { name } = account
    const { lowestBalance, transactions } = forecast
    console.log(`FORECAST: ${name}`)
    console.log(
      `\tLowest Balance: $${lowestBalance.amount} @ ${moment(
        lowestBalance.date
      ).toString()}`
    )
    console.log(`\tTransactions:`)
    transactions.map((t) => {
      const { balance, transaction } = t
      const { date, name, value } = transaction
      console.log(
        `\t\t${moment(date).toString()} - ${name} - ${value} - ${balance}`
      )
    })
  })

  console.log("Dunzo 🏁")
}

run()
