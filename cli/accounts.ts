import { validateAccount } from "../lib/accountUtil.js"
import { filterInvalid } from "../lib/validationUtil.js"
import { Account } from "../models/Account.js"
import { ValidationError } from "../models/ValidationError.js"
import { AccountRepo } from "../repos/AccountRepo.js"
import { MarkdownAccountRepo } from "../repos/markdown/MarkdownAccountRepo.js"

export const getValidAccounts = async (rootDir: string): Promise<Account[]> => {
  const accountRepo: AccountRepo = new MarkdownAccountRepo(rootDir)
  const accounts: Account[] = await accountRepo.getAll()
  const validAccounts: Account[] = filterInvalid(
    accounts,
    validateAccount,
    (account: Account, errors: ValidationError[]) => {
      console.log(`\nError in Account '${account.id}'`)
      errors.map((err) => console.log(`\t${err.field}: ${err.error}`))
    }
  )

  return validAccounts
}
