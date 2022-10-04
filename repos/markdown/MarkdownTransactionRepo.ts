import { existsSync } from "fs"
import path, { join, relative, resolve } from "path"
import { writeAsYamlFrontMatter } from "../../lib/fileUtil.js"
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
  private readonly importDir: string

  constructor(rootDir: string, importSubDir?: string) {
    this.rootDir = rootDir
    this.importDir = importSubDir ? join(rootDir, importSubDir) : rootDir
  }

  async getAll(): Promise<Transaction[]> {
    let trans: Transaction[] = await parseYamlFilesByType(
      this.rootDir,
      TransactionTypeName
    )
    return trans.map(this.standardizeIds)
  }

  async saveAll(transactions: Transaction[]): Promise<void> {
    await Promise.all(transactions.map(async (t) => await this.save(t)))
  }

  async save(transaction: Transaction): Promise<void> {
    const { id, name, value, accountId, date, isVerified, memo, fitid } =
      transaction
    const path: string = resolve(join(this.importDir, `${id}.md`))
    if (!existsSync(path)) {
      await writeAsYamlFrontMatter(
        {
          data_type: TransactionTypeName,
          name,
          value,
          accountId: relative(this.rootDir, accountId),
          date,
          isVerified,
          memo,
          fitid,
        },
        path
      )
    }
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
