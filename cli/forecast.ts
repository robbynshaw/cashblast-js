import moment from "moment"
import { CashBlast } from "../CashBlast.js"
import { ForecastResult } from "../models/ForecastResult.js"
import { AccountRepo } from "../repos/AccountRepo.js"
import { BillRepo } from "../repos/BillRepo.js"
import { MarkdownAccountRepo } from "../repos/markdown/MarkdownAccountRepo.js"
import { MarkdownBillRepo } from "../repos/markdown/MarkdownBillRepo.js"
import { MarkdownTransactionRepo } from "../repos/markdown/MarkdownTransactionRepo.js"
import { TransactionRepo } from "../repos/TransactionRepo.js"

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
    console.log(`\nFORECAST: ${name}`)
    console.log(
      `\tLowest Balance: $${lowestBalance.amount} @ ${moment(
        lowestBalance.date
      ).toString()}`
    )
    console.log(`\tTransactions:`)
    console.log(
      `\t\t${"DATE".padEnd(35)} | ${"NAME".padEnd(20)} | ${"VALUE".padEnd(
        11
      )} | ${"BALANCE"}`
    )
    console.log(
      "\t\t======================================================================================"
    )
    transactions.map((t) => {
      const { balance, transaction } = t
      const { date, name, value } = transaction
      console.log(
        `\t\t${moment(date).toString().padEnd(35)} | ${name.padEnd(
          20
        )} | $${value.toFixed(2).padStart(10)} | $${balance
          .toFixed(2)
          .padStart(10)}`
      )
    })
  })
}
