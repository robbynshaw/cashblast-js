import { Balance } from "../models/Balance.js"
import { BalancedTransaction } from "../models/BalancedTransaction.js"
import { Forecast } from "../models/Forecast.js"
import { Transaction } from "../models/Transaction.js"

export const dateSortBalancedAsc = (
  a: BalancedTransaction,
  b: BalancedTransaction
) => {
  return dateSortAsc(a.transaction, b.transaction)
}

export const dateSortAsc = (a: Transaction, b: Transaction) => {
  return a.date.getTime() - b.date.getTime()
}

const balanceTransactions = (
  transactions: Transaction[]
): BalancedTransaction[] => {
  if (!transactions || !transactions.length) {
    throw new Error("transactions must not be empty")
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
    throw new Error("transactions must not be empty")
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
  let lastYear: number = lastTrans.transaction.date.getFullYear()

  for (let i = 0; i < transactions.length; i++) {
    const t: BalancedTransaction = transactions[i]

    if (lastYear < t.transaction.date.getFullYear()) {
      results.push({
        date: new Date(lastYear, 12, 31, 23, 59, 59),
        amount: lastTrans.balance,
      })
      lastYear = t.transaction.date.getFullYear()
      lastTrans = t
    }

    if (i == transactions.length - 1) {
      results.push({
        date: new Date(t.transaction.date.getFullYear(), 12, 31, 23, 59, 59),
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
