import { validateAccount } from "../lib/accountUtil.js"
import { filterInvalid } from "../lib/validationUtil.js"
import { Account } from "../models/Account.js"
import { ValidationError } from "../models/ValidationError.js"
import { AccountRepo } from "../repos/AccountRepo.js"
import {
  AccountTypeName,
  MarkdownAccountRepo,
} from "../repos/markdown/MarkdownAccountRepo.js"

export const validateAccounts = async (rootDir: string): Promise<Account[]> => {
  let found: boolean = false
  console.log("Validating Accounts...\n")
  const accountRepo: AccountRepo = new MarkdownAccountRepo(rootDir)
  const accounts: Account[] = await accountRepo.getAll()
  const validAccounts: Account[] = filterInvalid(
    accounts,
    validateAccount,
    (account: Account, errors: ValidationError[]) => {
      found = true
      console.log(`\nError in Account '${account.id}'`)
      errors.map((err) => console.log(`\t${err.field}: ${err.error}`))
    }
  )

  if (!found && !validAccounts.length) {
    console.log(`WARNING: No markdown files were found with any YAML frontmatter containing
---
data_type: ${AccountTypeName} 
---
    `)
  } else {
    validAccounts.map((acct) => {
      console.log(`- Valid Account Found: ${acct.name}`)
    })
  }

  return validAccounts
}
