import Banking from "banking"
const { parseFile } = Banking

const f = parseFile(
  "./examples/imports/ExportedTransactionsAll.ofx",
  (file) => {
    //   console.log("Parsed", file.body)
    //   console.log("SIG..", file.body.OFX.SIGNONMSGSRSV1.SONRS)
    //   console.log("BANK", file.body.OFX.BANKMSGSRSV1.STMTTRNRS)
    //   console.log("Transactions", file.body.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS)
    const stmtrs = file.body.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS
    const { CURDEF, BANKACCTFROM, BANKTRANLIST, LEDGERBAL, AVAILBAL } = stmtrs
    const { BANKID, ACCTID, ACCTTYPE } = BANKACCTFROM
    const { DTSTART, DTEND, STMTTRN } = BANKTRANLIST

    console.log(`Currency: ${CURDEF}`)
    console.log(`Account Type: ${ACCTTYPE}`)
    console.log(`Account ID: ${ACCTID}`)
    console.log(`Current Balance: ${printBalances(LEDGERBAL)}`)
    console.log(`Available Balance: ${printBalances(AVAILBAL)}`)
    console.log(`Transactions From: ${DTSTART} TO ${DTEND}\n`)
    //   console.log(`Transactions: `, STMTTRN)

    let bal: number = LEDGERBAL.BALAMT
    STMTTRN.map((trans) => {
      const { TRNTYPE, DTPOSTED, TRNAMT, FITID, NAME, MEMO } = trans
      console.log(
        `${bal} | ${TRNTYPE} | ${DTPOSTED} | ${NAME} | ${TRNAMT} (${FITID})`
      )
      bal = bal - TRNAMT
    })
  }
)

function printBalances(bals: any): string {
  const { BALAMT, DTASOF } = bals
  return `$${BALAMT} As Of ${DTASOF}`
}
