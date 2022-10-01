import { Bill } from "./models/Bill"
import { getValidBills } from "./cli/bills"
import { Account } from "./models/Account"
import { getValidAccounts } from "./cli/accounts"

const run = async () => {
  console.log("💰💥💥 CashBlast 💰💥💥")

  const rootDir: string = "./examples"

  const accounts: Account[] = await getValidAccounts(rootDir)
  accounts.map((a) => console.log(`Valid Account: ${a.id}`))

  const bills: Bill[] = await getValidBills(rootDir, accounts)
  bills.map((b) => console.log(`Valid Bill: ${b.id}`))

  console.log("Dunzo 🏁")
}

run()
