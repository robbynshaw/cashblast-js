import {
  convertToAbsolutePath,
  parseYamlFilesByType,
} from "../../lib/markdownUtil"
import { Account } from "../../models/Account"
import { Transaction } from "../../models/Transaction"
import { TransactionRepo } from "../TransactionRepo"

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
}