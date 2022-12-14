import { existsSync } from "fs"
import { mkdir, writeFile } from "fs/promises"
import moment from "moment"
import path from "path"
import {
  createMarkdownReport,
  createMarkdownReportSimple,
  createMarkdownTable,
} from "../lib/markdownUtil.js"
import { ForecastResult } from "../models/ForecastResult.js"

export const printForecasts = async (forecasts: ForecastResult[]) => {
  forecasts.map((fcresult) => {
    const { account, forecast } = fcresult
    const { name } = account
    const { lowestBalance, transactions } = forecast
    console.log(`\nFORECAST: ${name}`)
    console.log(
      `\tLowest Balance: $${lowestBalance.amount.toFixed(2)} @ ${moment(
        lowestBalance.date
      ).format("lll")}`
    )
    console.log(`\tTransactions:`)
    console.log(
      `\t${"DATE".padEnd(25)} | ${"NAME".padEnd(40)} | ${"VALUE".padEnd(
        11
      )} | ${"BALANCE".padEnd(10)} | R_BAL`
    )
    console.log(
      "\t======================================================================================"
    )
    transactions.map((t) => {
      const { balance, transaction } = t
      const { date, name, value, importedBalance } = transaction
      console.log(
        `\t${moment(date).format("lll").padStart(25)} | ${name.padEnd(
          40
        )} | $${value.toFixed(2).padStart(10)} | $${balance
          .toFixed(2)
          .padStart(10)} | ${
          importedBalance && importedBalance.toFixed(2).padStart(10)
        }`
      )
    })
  })
}

export const printForecastsMdReports = async (
  forecasts: ForecastResult[],
  reportsDir: string
) => {
  console.log("Printing markdown reports")
  if (!existsSync(reportsDir)) {
    await mkdir(reportsDir)
  }

  forecasts.map(async (fcResult) => {
    const { account } = fcResult
    const { name } = account
    const report = createMarkdownReport(fcResult)
    const reportPath: string = path.join(reportsDir, `${name} Forecast.md`)
    await writeFile(reportPath, report)

    const simple = createMarkdownReportSimple(fcResult)
    const simpleReportPath: string = path.join(
      reportsDir,
      `${name} Forecast (For Graph).md`
    )
    await writeFile(simpleReportPath, simple)
  })
}
