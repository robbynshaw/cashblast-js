import { validateAccount } from "../lib/accountUtil"
import { Account } from "../models/Account"
import { ValidationError } from "../models/ValidationError"
import { AccountRepo } from "../repos/AccountRepo"
import { MarkdownAccountRepo } from "../repos/markdown/MarkdownAccountRepo"

export const getValidAccounts = async (rootDir: string): Promise<Account[]> => {
  const accountRepo: AccountRepo = new MarkdownAccountRepo(rootDir)
  const accounts: Account[] = await accountRepo.getAll()
  const validAccounts: Account[] = accounts
    .map((account) => {
      const errors: ValidationError[] = validateAccount(account)
      if (errors.length) {
        console.log(`\nError in Account '${account.id}'`)
        errors.map((err) => console.log(`\t${err.field}: ${err.error}`))
        return { account, valid: false }
      } else {
        return { account, valid: true }
      }
    })
    .filter((account) => account.valid)
    .map((b) => b.account)

  return validAccounts
}
