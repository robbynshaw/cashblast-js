import { validateAccount } from "../lib/accountUtil"
import { filterInvalid } from "../lib/validationUtil"
import { Account } from "../models/Account"
import { ValidationError } from "../models/ValidationError"
import { AccountRepo } from "../repos/AccountRepo"
import { MarkdownAccountRepo } from "../repos/markdown/MarkdownAccountRepo"

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
