import { Account } from "../../models/Account"
import { Bill } from "../../models/Bill"
import { BillRepo } from "../BillRepo"

import { findFilesByType, readYamlFrontMatter } from "../../lib/fileUtil"
import { parseYamlFilesByType } from "../../lib/markdownUtil"

export const BillTypeName = "CashBlast.Bill"

export class MarkdownBillRepo implements BillRepo {
  private readonly rootDir: string

  constructor(rootDir: string) {
    this.rootDir = rootDir
  }

  public async getAll(): Promise<Bill[]> {
    return await parseYamlFilesByType(this.rootDir, BillTypeName)
  }

  public async getForAccount(account: Account): Promise<Bill[]> {
    return await parseYamlFilesByType(this.rootDir, BillTypeName)
  }
}
