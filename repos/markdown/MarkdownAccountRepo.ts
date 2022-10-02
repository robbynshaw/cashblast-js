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
}
