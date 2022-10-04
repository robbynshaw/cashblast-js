import { createAllTransactions, validateBill } from "./lib/billUtil.js"
import { combineForecasts, createForecast } from "./lib/forecastUtil.js"
import { filterInvalid } from "./lib/validationUtil.js"
import { Account } from "./models/Account.js"
import { Bill } from "./models/Bill.js"
import { Forecast } from "./models/Forecast.js"
import { ForecastResult } from "./models/ForecastResult.js"
import { ForecastResultGroup } from "./models/ForecastResultGroup.js"
import { Transaction } from "./models/Transaction.js"
import { AccountRepo } from "./repos/AccountRepo.js"
import { BillRepo } from "./repos/BillRepo.js"
import { MarkdownBillRepo } from "./repos/markdown/MarkdownBillRepo.js"
import { TransactionRepo } from "./repos/TransactionRepo.js"

export class CashBlast {
  private readonly accountRepo: AccountRepo
  private readonly billRepo: BillRepo
  private readonly transRepo: TransactionRepo

  constructor(
    accountRepo: AccountRepo,
    billRepo: BillRepo,
    transRepo: TransactionRepo
  ) {
    this.accountRepo = accountRepo
    this.billRepo = billRepo
    this.transRepo = transRepo
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

        const manualTrans: Transaction[] = await this.transRepo.getForAccount(
          account
        )
        const transactions: Transaction[] = createAllTransactions(
          account,
          bills,
          start,
          end
        )
        const fc: Forecast = createForecast(account.name, [
          ...manualTrans,
          ...transactions,
        ])

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
