import { Account } from "../../models/Account.js"
import { Bill } from "../../models/Bill.js"
import { BillRepo } from "../BillRepo.js"

import {
  convertToAbsolutePath,
  parseYamlFilesByType,
} from "../../lib/markdownUtil.js"

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
    const bills: Bill[] = await this.getAll()
    return bills.filter((bill) => {
      if (
        bill.creditAccountId &&
        bill.creditAccountId.toLowerCase() === account.id.toLowerCase()
      ) {
        return true
      }
      if (
        bill.debitAccountId &&
        bill.debitAccountId.toLowerCase() === account.id.toLowerCase()
      ) {
        return true
      }
      return false
    })
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
