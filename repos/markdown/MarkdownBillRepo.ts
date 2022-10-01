import { Account } from "../../models/Account"
import { Bill } from "../../models/Bill"
import { BillRepo } from "../BillRepo"

import {
  convertToAbsolutePath,
  parseYamlFilesByType,
} from "../../lib/markdownUtil"

export const BillTypeName = "CashBlast.Bill"

export class MarkdownBillRepo implements BillRepo {
  private readonly rootDir: string

  constructor(rootDir: string) {
    this.rootDir = rootDir
  }

  public async getAll(): Promise<Bill[]> {
    let bills: Bill[] = await parseYamlFilesByType(this.rootDir, BillTypeName)
    return bills.map(this.standardizeIds)
  }

  public async getForAccount(account: Account): Promise<Bill[]> {
    let bills: Bill[] = await parseYamlFilesByType(this.rootDir, BillTypeName)
    return bills.map(this.standardizeIds)
  }

  private standardizeIds(bill: Bill): Bill {
    return {
      ...bill,
      creditAccountId: convertToAbsolutePath(bill.id, bill.creditAccountId),
      debitAccountId: convertToAbsolutePath(bill.id, bill.debitAccountId),
    }
  }

  public static resolveAccounts(bills: Bill[], accounts: Account[]): Bill[] {
    const accountsById: Map<string, Account> = new Map<string, Account>()
    accounts.map((account) => accountsById.set(account.id, account))

    console.log("Accounts:", accountsById)
    console.log("Bills:", bills)

    return bills.map((bill) => ({
      ...bill,
      creditAccount: bill.creditAccountId
        ? accountsById.get(bill.creditAccountId)
        : undefined,
      debitAccount: bill.debitAccountId
        ? accountsById.get(bill.debitAccountId)
        : undefined,
    }))
  }
}
