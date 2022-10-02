import {
  convertToAbsolutePath,
  parseYamlFilesByType,
} from "../../lib/markdownUtil.js"
import { Account } from "../../models/Account.js"
import { Transaction } from "../../models/Transaction.js"
import { TransactionRepo } from "../TransactionRepo.js"

export const TransactionTypeName = "CashBlast.Transaction"

export class MarkdownTransactionRepo implements TransactionRepo {
  private readonly rootDir: string

  constructor(rootDir: string) {
    this.rootDir = rootDir
  }
  async getAll(): Promise<Transaction[]> {
    let trans: Transaction[] = await parseYamlFilesByType(
      this.rootDir,
      TransactionTypeName
    )
    return trans.map(this.standardizeIds)
  }

  async getForAccount(account: Account): Promise<Transaction[]> {
    const trans: Transaction[] = await this.getAll()
    return trans.filter(
      (t) => t.accountId.toLowerCase() === account.id.toLowerCase()
    )
  }

  private standardizeIds(trans: Transaction): Transaction {
    return {
      ...trans,
      accountId: convertToAbsolutePath(trans.id, trans.accountId) || "",
    }
  }

  public static resolveAccounts(
    transactions: Transaction[],
    accounts: Account[]
  ): Transaction[] {
    const accountsById: Map<string, Account> = new Map<string, Account>()
    accounts.map((account) => accountsById.set(account.id, account))

    return transactions.map((t) => ({
      ...t,
      account: t.accountId ? accountsById.get(t.accountId) : undefined,
    }))
  }
}
