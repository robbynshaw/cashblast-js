import { argv } from "process"
import yargs from "yargs/yargs"
import { hideBin } from "yargs/helpers"
import path from "path"
import { parseDate } from "chrono-node"
import { printForecasts } from "./cli/forecast"

const run = async () => {
  console.log("💰💥💥 CashBlast 💰💥💥")
  const args = yargs(hideBin(argv))
    .options({
      rootDir: { type: "string", default: "./examples" },
      start: { type: "string", default: "31 Dec 2021" },
      end: { type: "string", default: "in 3 months" },
    })
    .parseSync()

  const rootDir: string = path.resolve(args.rootDir)
  console.log("Root Dir:", rootDir)

  const startDate: Date = parseDate(args.start)
  console.log("Start Date:", startDate)
  const endDate: Date = parseDate(args.end)
  console.log("End Date", endDate)

  // const accounts: Account[] = await getValidAccounts(rootDir)
  // accounts.map((a) => console.log(`Valid Account: ${a.id}`))

  // const bills: Bill[] = await getValidBills(rootDir, accounts)
  // bills.map((b) => console.log(`Valid Bill: ${b.id}`))

  await printForecasts(rootDir, startDate.getTime(), endDate.getTime())

  console.log("Dunzo 🏁")
}

run()
