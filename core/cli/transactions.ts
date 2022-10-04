import { validateTransaction } from "../lib/transactionUtil.js"
import { filterInvalid } from "../lib/validationUtil.js"
import { Account } from "../models/Account.js"
import { Transaction } from "../models/Transaction.js"
import { ValidationError } from "../models/ValidationError.js"
import {
  MarkdownTransactionRepo,
  TransactionTypeName,
} from "../repos/markdown/MarkdownTransactionRepo.js"
import { TransactionRepo } from "../repos/TransactionRepo.js"

export const validateTransactions = async (
  rootDir: string,
  accounts: Account[]
): Promise<Transaction[]> => {
  let found: boolean = false
  console.log("Validating Transactions...\n")
  const transRepo: TransactionRepo = new MarkdownTransactionRepo(rootDir)
  let trans: Transaction[] = await transRepo.getAll()
  trans = MarkdownTransactionRepo.resolveAccounts(trans, accounts)

  const validTransactions: Transaction[] = filterInvalid(
    trans,
    validateTransaction,
    (trans: Transaction, errors: ValidationError[]) => {
      found = true
      console.log(`\nError in Transaction '${trans.id}'`)
      errors.map((err) => console.log(`\t${err.field}: ${err.error}`))
    }
  )

  if (!found && !validTransactions.length) {
    console.log(`WARNING: No markdown files were found with any YAML frontmatter containing
---
data_type: ${TransactionTypeName} 
---
    `)
  } else {
    validTransactions.map((trans) =>
      console.log(`- Valid Transaction: ${trans.name}`)
    )
  }

  return validTransactions
}
