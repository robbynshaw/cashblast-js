import moment from "moment"
import { start } from "repl"
import { CashBlast } from "../CashBlast"
import { ForecastResult } from "../models/ForecastResult"
import { AccountRepo } from "../repos/AccountRepo"
import { BillRepo } from "../repos/BillRepo"
import { MarkdownAccountRepo } from "../repos/markdown/MarkdownAccountRepo"
import { MarkdownBillRepo } from "../repos/markdown/MarkdownBillRepo"
import { MarkdownTransactionRepo } from "../repos/markdown/MarkdownTransactionRepo"
import { TransactionRepo } from "../repos/TransactionRepo"

export const printForecasts = async (
  rootDir: string,
  start: number,
  end: number
) => {
  const accountRepo: AccountRepo = new MarkdownAccountRepo(rootDir)
  const billRepo: BillRepo = new MarkdownBillRepo(rootDir)
  const transRepo: TransactionRepo = new MarkdownTransactionRepo(rootDir)
  const cb: CashBlast = new CashBlast(accountRepo, billRepo, transRepo)

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
}
