import { Balance } from "../models/Balance"
import { BalancedTransaction } from "../models/BalancedTransaction"
import { Forecast } from "../models/Forecast"
import { Transaction } from "../models/Transaction"
import { getYear } from "./dateUtil"

export const dateSortBalancedAsc = (
  a: BalancedTransaction,
  b: BalancedTransaction
) => {
  return a.transaction.date - b.transaction.date
}

export const dateSortAsc = (a: Transaction, b: Transaction) => {
  return a.date - b.date
}

const balanceTransactions = (
  transactions: Transaction[]
): BalancedTransaction[] => {
  if (!transactions || !transactions.length) {
    return null
  }

  let balance: number = 0
  return transactions.sort(dateSortAsc).map((t) => {
    balance = balance + t.value

    return {
      balance: balance,
      transaction: t,
    }
  })
}

const getLowestBalance = (transactions: BalancedTransaction[]): Balance => {
  if (!transactions || !transactions.length) {
    return null
  }

  let result = transactions[0]
  transactions.map((t) => {
    if (t.balance < result.balance) {
      result = t
    }
  })
  return {
    date: result.transaction.date,
    amount: result.balance,
  }
}

const getYearlyBalances = (transactions: BalancedTransaction[]): Balance[] => {
  const results: Balance[] = []
  const sortedTransactions: BalancedTransaction[] =
    transactions.sort(dateSortBalancedAsc)
  let lastTrans: BalancedTransaction = sortedTransactions[0]
  let lastYear: number = getYear(lastTrans.transaction.date)

  for (let i = 0; i < transactions.length; i++) {
    const t: BalancedTransaction = transactions[i]

    if (lastYear < getYear(t.transaction.date)) {
      results.push({
        date: new Date(lastYear, 12, 31, 23, 59, 59).getTime(),
        amount: lastTrans.balance,
      })
      lastYear = getYear(t.transaction.date)
      lastTrans = t
    }

    if (i == transactions.length - 1) {
      results.push({
        date: new Date(
          getYear(t.transaction.date),
          12,
          31,
          23,
          59,
          59
        ).getTime(),
        amount: t.balance,
      })
    }
  }

  return results
}

export const createForecast = (
  name: string,
  transactions: Transaction[]
): Forecast => {
  const results: BalancedTransaction[] = balanceTransactions(transactions)

  return {
    name,
    transactions: results,
    lowestBalance: getLowestBalance(results),
    yearlyBalances: getYearlyBalances(results),
  }
}

export const combineForecasts = (
  name: string,
  forecasts: Forecast[]
): Forecast => {
  const results: Transaction[] = []
  forecasts.map((fc) => {
    fc.transactions.map((t) => {
      results.push({
        ...t.transaction,
      })
    })
  })
  return createForecast(name, results)
}
