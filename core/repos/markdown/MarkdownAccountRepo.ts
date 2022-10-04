import { parseYamlFilesByType } from "../../lib/markdownUtil.js"
import { Account } from "../../models/Account.js"
import { AccountRepo } from "../AccountRepo.js"

export const AccountTypeName = "CashBlast.Account"

export class MarkdownAccountRepo implements AccountRepo {
  private readonly rootDir: string

  constructor(rootDir: string) {
    this.rootDir = rootDir
  }

  public async getAll(): Promise<Account[]> {
    const accounts: Account[] = await parseYamlFilesByType(
      this.rootDir,
      AccountTypeName
    )
    return accounts
  }

  public async getByID(id: string): Promise<Account | null> {
    const accounts: Account[] = await this.getAll()
    const results: Account[] = accounts.filter(
      (ac) => ac.id.toLowerCase() === id.toLowerCase()
    )
    if (results.length) {
      return results[0]
    }
    return null
  }
}
