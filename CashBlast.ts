import {
  createAllTransactions,
  createTransactions,
  validateBill,
} from "./lib/billUtil"
import { combineForecasts, createForecast } from "./lib/forecastUtil"
import { filterInvalid } from "./lib/validationUtil"
import { Account } from "./models/Account"
import { Bill } from "./models/Bill"
import { Forecast } from "./models/Forecast"
import { ForecastResult } from "./models/ForecastResult"
import { ForecastResultGroup } from "./models/ForecastResultGroup"
import { Transaction } from "./models/Transaction"
import { AccountRepo } from "./repos/AccountRepo"
import { BillRepo } from "./repos/BillRepo"
import { MarkdownBillRepo } from "./repos/markdown/MarkdownBillRepo"

export class CashBlast {
  private readonly accountRepo: AccountRepo
  private readonly billRepo: BillRepo

  constructor(accountRepo: AccountRepo, billRepo: BillRepo) {
    this.accountRepo = accountRepo
    this.billRepo = billRepo
  }

  public async forecastAll(
    start: number,
    end: number
  ): Promise<ForecastResult[]> {
    const accounts: Account[] = await this.accountRepo.getAll()

    const results: ForecastResult[] = await Promise.all(
      accounts.map(async (account) => {
        let bills: Bill[] = await this.billRepo.getForAccount(account)
        bills = MarkdownBillRepo.resolveAccounts(bills, [account])
        bills = filterInvalid<Bill>(bills, validateBill)

        const transactions: Transaction[] = createAllTransactions(
          bills,
          start,
          end
        )
        const fc: Forecast = createForecast(account.name, transactions)

        return {
          account,
          forecast: fc,
        }
      })
    )

    return results
  }
}

export const groupForecastResults = (
  forecasts: ForecastResult[],
  groups: string[]
): ForecastResultGroup[] => {
  let results: ForecastResultGroup[] = groups.map((grp) => ({
    name: grp,
    forecasts: [],
  }))

  forecasts.map((fc) => {
    const { account } = fc
    let { groups } = account
    groups = groups || []
    groups.map((grp) => {
      for (let i = 0; i < results.length; i++) {
        if (results[i].name === grp) {
          results[i].forecasts.push(fc)
        }
      }
    })
  })

  results = results.map((r) => ({
    ...r,
    combinedForecast: combineForecasts(
      "__totals__",
      r.forecasts.map((f) => f.forecast)
    ),
  }))

  return results
}
