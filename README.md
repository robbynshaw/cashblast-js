# CashBlast JS

## Overview

- This current implementation is designed to eventually be an [Obsidian](https://obsidian.md) plugin
  - Obsidian is not necessary to use this
- The data is stored in markdown files as yaml frontmatter
- Setup your accounts, bills, and initial transactions.
  - See the `examples/markdown` folder for a basic setup
    - The "write-reports" command will create a full forecast table on a page and a simpler table
      - The simpler table can be made into a graph overview using the [Obsidian Charts plugin](https://charts.phibr0.de/Chart%20from%20Table)
        - See example at `examples/markdown/accounts/chase_checking.md`

## Usage

> Currently, just a simple command line app run in development

```sh
# install dependencies
yarn
# run
yarn workspace core start print-reports
# other options
yarn workspace core start --help
yarn workspace core start validate --rootDir "C:\myData"
yarn workspace core start print-reports --start "5 years ago" --end "in 21 days"
yarn workspace core start write-reports

# example output
💰💥💥 CashBlast 💰💥💥
Root Dir: C:\Users\robby\src\greengraph-js\examples\markdown
Reports Dir: C:\Users\robby\src\greengraph-js\examples\markdown\reports
Start Date: 2021-12-31T18:00:00.000Z
End Date 2023-01-02T04:02:22.255Z

FORECAST: Chase Checking
        Lowest Balance: $1446.68 @ Dec 31, 2021 6:00 PM
        Transactions:
        DATE                      | NAME                 | VALUE       | BALANCE
        ======================================================================================
             Dec 31, 2021 6:00 PM | Initial Balance      | $   3456.00 | $   3456.00
             Dec 31, 2021 6:00 PM | Property Taxes       | $  -2009.32 | $   1446.68
             Jan 8, 2022 10:02 PM | Paycheck from Work   | $   2000.00 | $   3446.68
            Jan 14, 2022 10:02 PM | Electricity          | $    -54.00 | $   3392.68
            Jan 22, 2022 10:02 PM | Paycheck from Work   | $   2000.00 | $   5392.68
             Feb 5, 2022 10:02 PM | Paycheck from Work   | $   2000.00 | $   7392.68
            Feb 14, 2022 10:02 PM | Electricity          | $    -54.00 | $   7338.68
            Feb 19, 2022 10:02 PM | Paycheck from Work   | $   2000.00 | $   9338.68
             Mar 5, 2022 10:02 PM | Paycheck from Work   | $   2000.00 | $  11338.68
             Mar 14, 2022 7:00 PM | Doctor Bill from March 15, 2022 | $   -513.76 | $  10824.92
            Mar 14, 2022 11:02 PM | Electricity          | $    -54.00 | $  10770.92
            Mar 19, 2022 11:02 PM | Paycheck from Work   | $   2000.00 | $  12770.92
             Apr 2, 2022 11:02 PM | Paycheck from Work   | $   2000.00 | $  14770.92
            Apr 14, 2022 11:02 PM | Electricity          | $    -54.00 | $  14716.92
            Apr 16, 2022 11:02 PM | Paycheck from Work   | $   2000.00 | $  16716.92
            Apr 30, 2022 11:02 PM | Home Loan            | $   -750.00 | $  15966.92
            Apr 30, 2022 11:02 PM | Paycheck from Work   | $   2000.00 | $  17966.92
            May 14, 2022 11:02 PM | Electricity          | $    -54.00 | $  17912.92
            May 14, 2022 11:02 PM | Paycheck from Work   | $   2000.00 | $  19912.92
            May 28, 2022 11:02 PM | Paycheck from Work   | $   2000.00 | $  21912.92
            May 30, 2022 11:02 PM | Home Loan            | $   -750.00 | $  21162.92
             Jun 1, 2022 11:02 PM | Water                | $    -27.00 | $  21135.92
            Jun 11, 2022 11:02 PM | Paycheck from Work   | $   2000.00 | $  23135.92
            Jun 14, 2022 11:02 PM | Electricity          | $    -54.00 | $  23081.92
            Jun 25, 2022 11:02 PM | Paycheck from Work   | $   2000.00 | $  25081.92
            Jun 29, 2022 11:02 PM | Home Loan            | $   -750.00 | $  24331.92
             Jul 1, 2022 11:02 PM | Water                | $    -27.00 | $  24304.92
             Jul 9, 2022 11:02 PM | Paycheck from Work   | $   2000.00 | $  26304.92
            Jul 14, 2022 11:02 PM | Electricity          | $    -54.00 | $  26250.92
            Jul 23, 2022 11:02 PM | Paycheck from Work   | $   2000.00 | $  28250.92
            Jul 29, 2022 11:02 PM | Home Loan            | $   -750.00 | $  27500.92
             Aug 1, 2022 11:02 PM | Water                | $    -27.00 | $  27473.92
             Aug 6, 2022 11:02 PM | Paycheck from Work   | $   2000.00 | $  29473.92
            Aug 14, 2022 11:02 PM | Electricity          | $    -54.00 | $  29419.92
            Aug 20, 2022 11:02 PM | Paycheck from Work   | $   2000.00 | $  31419.92
            Aug 28, 2022 11:02 PM | Home Loan            | $   -750.00 | $  30669.92
             Sep 1, 2022 11:02 PM | Water                | $    -27.00 | $  30642.92
             Sep 3, 2022 11:02 PM | Paycheck from Work   | $   2000.00 | $  32642.92
             Sep 14, 2022 7:00 PM | Doctor Bill from September 15, 2022 | $  -1203.34 | $  31439.58
            Sep 14, 2022 11:02 PM | Electricity          | $    -54.00 | $  31385.58
            Sep 17, 2022 11:02 PM | Paycheck from Work   | $   2000.00 | $  33385.58
            Sep 27, 2022 11:02 PM | Home Loan            | $   -750.00 | $  32635.58
             Oct 1, 2022 11:02 PM | Water                | $    -27.00 | $  32608.58
             Oct 1, 2022 11:02 PM | Paycheck from Work   | $   2000.00 | $  34608.58
            Oct 14, 2022 11:02 PM | Electricity          | $    -54.00 | $  34554.58
            Oct 15, 2022 11:02 PM | Paycheck from Work   | $   2000.00 | $  36554.58
            Oct 27, 2022 11:02 PM | Home Loan            | $   -750.00 | $  35804.58
            Oct 29, 2022 11:02 PM | Paycheck from Work   | $   2000.00 | $  37804.58
             Nov 1, 2022 11:02 PM | Water                | $    -27.00 | $  37777.58
            Nov 12, 2022 10:02 PM | Paycheck from Work   | $   2000.00 | $  39777.58
            Nov 14, 2022 10:02 PM | Electricity          | $    -54.00 | $  39723.58
            Nov 26, 2022 10:02 PM | Home Loan            | $   -750.00 | $  38973.58
            Nov 26, 2022 10:02 PM | Paycheck from Work   | $   2000.00 | $  40973.58
             Dec 1, 2022 10:02 PM | Water                | $    -27.00 | $  40946.58
            Dec 10, 2022 10:02 PM | Paycheck from Work   | $   2000.00 | $  42946.58
            Dec 14, 2022 10:02 PM | Electricity          | $    -54.00 | $  42892.58
            Dec 24, 2022 10:02 PM | Paycheck from Work   | $   2000.00 | $  44892.58
            Dec 26, 2022 10:02 PM | Home Loan            | $   -750.00 | $  44142.58
             Jan 1, 2023 10:02 PM | Water                | $    -27.00 | $  44115.58

FORECAST: Home Asset
        Lowest Balance: $23000.00 @ Dec 31, 2019 6:00 PM
        Transactions:
        DATE                      | NAME                 | VALUE       | BALANCE
        ======================================================================================
             Dec 31, 2019 6:00 PM | Initial Balance      | $  23000.00 | $  23000.00
            Apr 30, 2022 11:02 PM | Home Loan            | $    750.00 | $  23750.00
            May 30, 2022 11:02 PM | Home Loan            | $    750.00 | $  24500.00
            Jun 29, 2022 11:02 PM | Home Loan            | $    750.00 | $  25250.00
            Jul 29, 2022 11:02 PM | Home Loan            | $    750.00 | $  26000.00
            Aug 28, 2022 11:02 PM | Home Loan            | $    750.00 | $  26750.00
            Sep 27, 2022 11:02 PM | Home Loan            | $    750.00 | $  27500.00
            Oct 27, 2022 11:02 PM | Home Loan            | $    750.00 | $  28250.00
            Nov 26, 2022 10:02 PM | Home Loan            | $    750.00 | $  29000.00
            Dec 26, 2022 10:02 PM | Home Loan            | $    750.00 | $  29750.00

Dunzo 🏁
```

## Development
