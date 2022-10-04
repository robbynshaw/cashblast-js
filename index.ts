import { argv } from "process"
import yargs from "yargs/yargs"
import { hideBin } from "yargs/helpers"
import path from "path"
import { parseDate } from "chrono-node"
import { printForecasts, printForecastsMdReports } from "./cli/forecast.js"
import { start } from "repl"
import { CashBlast } from "./CashBlast.js"
import { ForecastResult } from "./models/ForecastResult.js"
import { AccountRepo } from "./repos/AccountRepo.js"
import { BillRepo } from "./repos/BillRepo.js"
import { MarkdownAccountRepo } from "./repos/markdown/MarkdownAccountRepo.js"
import { MarkdownBillRepo } from "./repos/markdown/MarkdownBillRepo.js"
import { MarkdownTransactionRepo } from "./repos/markdown/MarkdownTransactionRepo.js"
import { TransactionRepo } from "./repos/TransactionRepo.js"
import { validateAccounts } from "./cli/accounts.js"
import { validateBills } from "./cli/bills.js"
import { Account } from "./models/Account.js"
import { validateTransactions } from "./cli/transactions.js"
import { BalancedTransaction } from "./models/BalancedTransaction.js"
import { parseTransactions } from "./lib/ofxUtil.js"
import { existsSync } from "fs"
import { mkdir } from "fs/promises"

const run = async () => {
  console.log("💰💥💥 CashBlast 💰💥💥")
  await yargs(hideBin(argv))
    .command(
      "validate",
      "validate the files in the root directory",
      (rgs) => {
        rgs.options({
          rootDir: { type: "string", default: "./examples/markdown" },
        })
      },
      async (validateArgs: any) => {
        const rootDir: string = path.resolve(validateArgs.rootDir)
        console.log("Root Dir:", rootDir)
        console.log()

        const accounts: Account[] = await validateAccounts(rootDir)
        console.log()
        await validateBills(rootDir, accounts)
        console.log()
        await validateTransactions(rootDir, accounts)
      }
    )
    .command(
      "write-reports",
      "write markdown transaction reports",
      (rgs) => {
        rgs.options({
          rootDir: { type: "string", default: "./examples/markdown" },
          start: { type: "string", default: "31 Dec 2021" },
          end: { type: "string", default: "in 3 months" },
          reportsDir: {
            type: "string",
            default: "./examples/markdown/reports",
          },
        })
      },
      async (writeArgs: any) => {
        const rootDir: string = path.resolve(writeArgs.rootDir)
        console.log("Root Dir:", rootDir)
        const reportsDir: string = path.resolve(writeArgs.reportsDir)
        console.log("Reports Dir:", reportsDir)

        const startDate: Date = parseDate(writeArgs.start)
        console.log("Start Date:", startDate)
        const endDate: Date = parseDate(writeArgs.end)
        console.log("End Date", endDate)

        const accountRepo: AccountRepo = new MarkdownAccountRepo(rootDir)
        const billRepo: BillRepo = new MarkdownBillRepo(rootDir)
        const transRepo: TransactionRepo = new MarkdownTransactionRepo(rootDir)
        const cb: CashBlast = new CashBlast(accountRepo, billRepo, transRepo)

        const forecasts: ForecastResult[] = await cb.forecastAll(
          startDate.getTime(),
          endDate.getTime()
        )

        // await printForecasts(forecasts)
        await printForecastsMdReports(forecasts, reportsDir)
      }
    )
    .command(
      "print-reports",
      "print transaction reports to the console",
      (rgs) => {
        rgs.options({
          rootDir: { type: "string", default: "./examples/markdown" },
          start: { type: "string", default: "31 Dec 2021" },
          end: { type: "string", default: "in 3 months" },
          reportsDir: {
            type: "string",
            default: "./examples/markdown/reports",
          },
        })
      },
      async (writeArgs: any) => {
        const rootDir: string = path.resolve(writeArgs.rootDir)
        console.log("Root Dir:", rootDir)
        const reportsDir: string = path.resolve(writeArgs.reportsDir)
        console.log("Reports Dir:", reportsDir)

        const startDate: Date = parseDate(writeArgs.start)
        console.log("Start Date:", startDate)
        const endDate: Date = parseDate(writeArgs.end)
        console.log("End Date", endDate)

        const accountRepo: AccountRepo = new MarkdownAccountRepo(rootDir)
        const billRepo: BillRepo = new MarkdownBillRepo(rootDir)
        const transRepo: TransactionRepo = new MarkdownTransactionRepo(rootDir)
        const cb: CashBlast = new CashBlast(accountRepo, billRepo, transRepo)

        const forecasts: ForecastResult[] = await cb.forecastAll(
          startDate.getTime(),
          endDate.getTime()
        )

        await printForecasts(forecasts)
      }
    )
    .command(
      "import-transactions",
      "parse transactions from file and save to database",
      (rgs) => {
        rgs
          .options({
            file: { type: "string" },
            accountId: { type: "string" },
            rootDir: { type: "string", default: "./examples/markdown" },
            subDir: { type: "string", default: "transactions" },
          })
          .alias("f", "file")
          .alias("r", "rootDir")
          .alias("a", "accountId")
          .alias("s", "subDir")
          .demandOption(["file", "accountId"])
      },
      async (importArgs: any) => {
        const rootDir: string = path.resolve(importArgs.rootDir)
        console.log("Root Dir:", rootDir)
        const subDir: string = path.resolve(
          path.join(importArgs.rootDir, importArgs.subDir)
        )
        console.log("Write Directory: ", subDir)
        const importFile: string = path.resolve(importArgs.file)
        console.log("Import FIle:", importFile)
        const accountId: string = path.resolve(importArgs.accountId)
        console.log("Account ID:", accountId)

        const accountRepo: AccountRepo = new MarkdownAccountRepo(rootDir)
        const transRepo: TransactionRepo = new MarkdownTransactionRepo(
          rootDir,
          importArgs.subDir
        )

        const account: Account = await accountRepo.getByID(accountId)
        if (!account) {
          console.log(`Unable to find account by id: ${accountId}`)
          return
        }

        if (!existsSync(subDir)) {
          console.log("Creating write directory...")
          await mkdir(subDir, { recursive: true })
        }

        console.log("Parsing transactions...")
        const bTrans: BalancedTransaction[] = await parseTransactions(
          importFile,
          account
        )
        console.log(`Found ${bTrans.length} transaction(s).`)
        console.log("Importing...")
        await transRepo.saveAll(bTrans.map((bt) => bt.transaction))
        console.log("Import complete")
      }
    )
    .parseAsync()

  console.log("\nDunzo 🏁")
}

run()
