# CashBlast JS

## Overview

- This current implementation is designed to eventually be an [Obsidian](https://obsidian.md) plugin
  - Obsidian is not necessary to use this
- The data is stored in markdown files as yaml frontmatter
- Setup your accounts, bills, and initial transactions.
  - See the `examples/markdown` folder for a basic setup

## Usage

> Currently, just a simple command line app run in development

```sh
# install dependencies
yarn
# run
yarn start
# other options
yarn start --help
yarn start --rootDir "C:\myData"
yarn start --start "5 years ago" --end "in 21 days"

# example output
💰💥💥 CashBlast 💰💥💥
Root Dir: C:\myData\examples
Start Date: 2021-12-31T18:00:00.000Z
End Date 2023-01-01T23:06:15.539Z

FORECAST: Chase Checking
        Lowest Balance: $1446.68 @ Fri Dec 31 2021 18:00:00 GMT-0600
        Transactions:
                DATE                                | NAME                 | VALUE       | BALANCE
                ======================================================================================
                Fri Dec 31 2021 18:00:00 GMT-0600   | Initial Balance      | $   3456.00 | $   3456.00
                Fri Dec 31 2021 18:00:00 GMT-0600   | Property Taxes       | $  -2009.32 | $   1446.68
                Sat Jan 08 2022 17:06:15 GMT-0600   | Paycheck from Work   | $   2000.00 | $   3446.68
                Sat Jan 15 2022 17:06:15 GMT-0600   | Electricity          | $    -54.00 | $   3392.68
                Sat Jan 22 2022 17:06:15 GMT-0600   | Paycheck from Work   | $   2000.00 | $   5392.68
                Sat Feb 05 2022 17:06:15 GMT-0600   | Paycheck from Work   | $   2000.00 | $   7392.68
                Tue Feb 15 2022 17:06:15 GMT-0600   | Electricity          | $    -54.00 | $   7338.68
                Sat Feb 19 2022 17:06:15 GMT-0600   | Paycheck from Work   | $   2000.00 | $   9338.68
                Sat Mar 05 2022 17:06:15 GMT-0600   | Paycheck from Work   | $   2000.00 | $  11338.68
                Mon Mar 14 2022 19:00:00 GMT-0500   | Doctor Bill from March 15, 2022 | $   -513.76 | $  10824.92
                Tue Mar 15 2022 18:06:15 GMT-0500   | Electricity          | $    -54.00 | $  10770.92
                Sat Mar 19 2022 18:06:15 GMT-0500   | Paycheck from Work   | $   2000.00 | $  12770.92
                Sat Apr 02 2022 18:06:15 GMT-0500   | Paycheck from Work   | $   2000.00 | $  14770.92
                Fri Apr 15 2022 18:06:15 GMT-0500   | Electricity          | $    -54.00 | $  14716.92
                Sat Apr 16 2022 18:06:15 GMT-0500   | Paycheck from Work   | $   2000.00 | $  16716.92
                Sat Apr 30 2022 18:06:15 GMT-0500   | Paycheck from Work   | $   2000.00 | $  18716.92
                Sun May 01 2022 18:06:15 GMT-0500   | Home Loan            | $   -750.00 | $  17966.92
                Sat May 14 2022 18:06:15 GMT-0500   | Paycheck from Work   | $   2000.00 | $  19966.92
                Sun May 15 2022 18:06:15 GMT-0500   | Electricity          | $    -54.00 | $  19912.92
                Sat May 28 2022 18:06:15 GMT-0500   | Paycheck from Work   | $   2000.00 | $  21912.92
                Tue May 31 2022 18:06:15 GMT-0500   | Home Loan            | $   -750.00 | $  21162.92
                Wed Jun 01 2022 18:06:15 GMT-0500   | Water                | $    -27.00 | $  21135.92
                Sat Jun 11 2022 18:06:15 GMT-0500   | Paycheck from Work   | $   2000.00 | $  23135.92
                Wed Jun 15 2022 18:06:15 GMT-0500   | Electricity          | $    -54.00 | $  23081.92
                Sat Jun 25 2022 18:06:15 GMT-0500   | Paycheck from Work   | $   2000.00 | $  25081.92
                Thu Jun 30 2022 18:06:15 GMT-0500   | Home Loan            | $   -750.00 | $  24331.92
                Fri Jul 01 2022 18:06:15 GMT-0500   | Water                | $    -27.00 | $  24304.92
                Sat Jul 09 2022 18:06:15 GMT-0500   | Paycheck from Work   | $   2000.00 | $  26304.92
                Fri Jul 15 2022 18:06:15 GMT-0500   | Electricity          | $    -54.00 | $  26250.92
                Sat Jul 23 2022 18:06:15 GMT-0500   | Paycheck from Work   | $   2000.00 | $  28250.92
                Sat Jul 30 2022 18:06:15 GMT-0500   | Home Loan            | $   -750.00 | $  27500.92
                Mon Aug 01 2022 18:06:15 GMT-0500   | Water                | $    -27.00 | $  27473.92
                Sat Aug 06 2022 18:06:15 GMT-0500   | Paycheck from Work   | $   2000.00 | $  29473.92
                Mon Aug 15 2022 18:06:15 GMT-0500   | Electricity          | $    -54.00 | $  29419.92
                Sat Aug 20 2022 18:06:15 GMT-0500   | Paycheck from Work   | $   2000.00 | $  31419.92
                Mon Aug 29 2022 18:06:15 GMT-0500   | Home Loan            | $   -750.00 | $  30669.92
                Thu Sep 01 2022 18:06:15 GMT-0500   | Water                | $    -27.00 | $  30642.92
                Sat Sep 03 2022 18:06:15 GMT-0500   | Paycheck from Work   | $   2000.00 | $  32642.92
                Wed Sep 14 2022 19:00:00 GMT-0500   | Doctor Bill from September 15, 2022 | $  -1203.34 | $  31439.58
                Thu Sep 15 2022 18:06:15 GMT-0500   | Electricity          | $    -54.00 | $  31385.58
                Sat Sep 17 2022 18:06:15 GMT-0500   | Paycheck from Work   | $   2000.00 | $  33385.58
                Wed Sep 28 2022 18:06:15 GMT-0500   | Home Loan            | $   -750.00 | $  32635.58
                Sat Oct 01 2022 18:06:15 GMT-0500   | Water                | $    -27.00 | $  32608.58
                Sat Oct 01 2022 18:06:15 GMT-0500   | Paycheck from Work   | $   2000.00 | $  34608.58
                Sat Oct 15 2022 18:06:15 GMT-0500   | Electricity          | $    -54.00 | $  34554.58
                Sat Oct 15 2022 18:06:15 GMT-0500   | Paycheck from Work   | $   2000.00 | $  36554.58
                Fri Oct 28 2022 18:06:15 GMT-0500   | Home Loan            | $   -750.00 | $  35804.58
                Sat Oct 29 2022 18:06:15 GMT-0500   | Paycheck from Work   | $   2000.00 | $  37804.58
                Tue Nov 01 2022 18:06:15 GMT-0500   | Water                | $    -27.00 | $  37777.58
                Sat Nov 12 2022 17:06:15 GMT-0600   | Paycheck from Work   | $   2000.00 | $  39777.58
                Tue Nov 15 2022 17:06:15 GMT-0600   | Electricity          | $    -54.00 | $  39723.58
                Sat Nov 26 2022 17:06:15 GMT-0600   | Paycheck from Work   | $   2000.00 | $  41723.58
                Sun Nov 27 2022 17:06:15 GMT-0600   | Home Loan            | $   -750.00 | $  40973.58
                Thu Dec 01 2022 17:06:15 GMT-0600   | Water                | $    -27.00 | $  40946.58
                Sat Dec 10 2022 17:06:15 GMT-0600   | Paycheck from Work   | $   2000.00 | $  42946.58
                Thu Dec 15 2022 17:06:15 GMT-0600   | Electricity          | $    -54.00 | $  42892.58
                Sat Dec 24 2022 17:06:15 GMT-0600   | Paycheck from Work   | $   2000.00 | $  44892.58
                Tue Dec 27 2022 17:06:15 GMT-0600   | Home Loan            | $   -750.00 | $  44142.58
                Sun Jan 01 2023 17:06:15 GMT-0600   | Water                | $    -27.00 | $  44115.58

FORECAST: Home Asset
        Lowest Balance: $23000 @ Tue Dec 31 2019 18:00:00 GMT-0600
        Transactions:
                DATE                                | NAME                 | VALUE       | BALANCE
                ======================================================================================
                Tue Dec 31 2019 18:00:00 GMT-0600   | Initial Balance      | $  23000.00 | $  23000.00
                Sun May 01 2022 18:06:15 GMT-0500   | Home Loan            | $    750.00 | $  23750.00
                Tue May 31 2022 18:06:15 GMT-0500   | Home Loan            | $    750.00 | $  24500.00
                Thu Jun 30 2022 18:06:15 GMT-0500   | Home Loan            | $    750.00 | $  25250.00
                Sat Jul 30 2022 18:06:15 GMT-0500   | Home Loan            | $    750.00 | $  26000.00
                Mon Aug 29 2022 18:06:15 GMT-0500   | Home Loan            | $    750.00 | $  26750.00
                Wed Sep 28 2022 18:06:15 GMT-0500   | Home Loan            | $    750.00 | $  27500.00
                Fri Oct 28 2022 18:06:15 GMT-0500   | Home Loan            | $    750.00 | $  28250.00
                Sun Nov 27 2022 17:06:15 GMT-0600   | Home Loan            | $    750.00 | $  29000.00
                Tue Dec 27 2022 17:06:15 GMT-0600   | Home Loan            | $    750.00 | $  29750.00
Dunzo 🏁
```

## Development
