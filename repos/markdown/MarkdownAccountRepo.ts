import { parseYamlFilesByType } from "../../lib/markdownUtil"
import { Account } from "../../models/Account"
import { AccountRepo } from "../AccountRepo"

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
