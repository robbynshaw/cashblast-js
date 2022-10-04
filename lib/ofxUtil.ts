import Banking from "banking"
import { BalancedTransaction } from "../models/BalancedTransaction.js"
import { Account } from "../models/Account.js"
import { parseDate } from "chrono-node"

export const parseTransactions = async (
  path: string,
  account: Account
): Promise<BalancedTransaction[]> => {
  return new Promise((resolve, reject) => {
    const { parseFile } = Banking

    const results: BalancedTransaction[] = []
    const f = parseFile(path, (file) => {
      const stmtrs = file.body.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS
      const { BANKACCTFROM, BANKTRANLIST, LEDGERBAL } = stmtrs
      const { ACCTID } = BANKACCTFROM
      const { STMTTRN } = BANKTRANLIST
      const { BALAMT } = LEDGERBAL

      //   console.log(`Currency: ${CURDEF}`)
      //   console.log(`Account ID: ${ACCTID}`)
      //   console.log(`Transactions From: ${DTSTART} TO ${DTEND}\n`)

      let bal: number = BALAMT
      STMTTRN.map((trans) => {
        const { TRNTYPE, DTPOSTED, TRNAMT, FITID, NAME, MEMO } = trans
        const uid: string = `${ACCTID}.${FITID}`
          .replace(new RegExp(",", "g"), "_")
          .replace(new RegExp(" ", "g"), "_")
        bal = bal - TRNAMT
        results.push({
          balance: parseFloat(bal.toFixed(2)),
          transaction: {
            id: uid,
            name: NAME,
            value: parseFloat(TRNAMT),
            account: account,
            accountId: account.id,
            date: parseOfxDate(DTPOSTED),
            isVerified: true,
            memo: MEMO,
            fitid: uid,
            importedBalance: parseFloat(bal.toFixed(2)),
          },
        })
      })
      resolve(results)
    })
  })
}

const parseOfxDate = (dt: string): Date => {
  const dtStr = `${dt.substring(0, 4)}-${dt.substring(4, 6)}-${dt.substring(
    6,
    8
  )}T${dt.substring(8, 10)}:${dt.substring(10, 12)}:${dt.substring(
    12,
    18
  )}${dt.substring(19, 22)}:00`
  const result = new Date(Date.parse(dtStr))
  return result
}
