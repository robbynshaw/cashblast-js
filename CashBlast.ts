import { createAllTransactions, createTransactions } from "./lib/billUtil"
import { combineForecasts, createForecast } from "./lib/forecastUtil"
import { Account } from "./models/Account"
import { Bill } from "./models/Bill"
import { Forecast } from "./models/Forecast"
import { ForecastResult } from "./models/ForecastResult"
import { ForecastResultGroup } from "./models/ForecastResultGroup"
import { Transaction } from "./models/Transaction"
import { AccountRepo } from "./repos/AccountRepo"
import { BillRepo } from "./repos/BillRepo"

export class CashBlash {
  private readonly accountRepo: AccountRepo
  private readonly billRepo: BillRepo

  constructor(accountRepo: AccountRepo, billRepo: BillRepo) {
    this.accountRepo = accountRepo
    this.billRepo = billRepo
  }

  public forecastAll(start: number, end: number): ForecastResult[] {
    const accountRepo: AccountRepo = new AccountRepo()
    const billRepo: BillRepo = new BillRepo()

    const accounts: Account[] = accountRepo.getAll()

    const results: ForecastResult[] = accounts.map((account) => {
      const bills: Bill[] = billRepo.getForAccount(account)
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
    combinedForecast: null,
  }))

  forecasts.map((fc) => {
    fc.account.groups.map((grp) => {
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
