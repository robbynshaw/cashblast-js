# CashBlast JS

## Usage

> Currently, just a simple command line app run in development

```sh
# install dependencies
yarn
# run
yarn start

# example output
💰💥💥 CashBlast 💰💥💥
FORECAST: Chase Checking
        Lowest Balance: $3456 @ Fri Dec 31 2021 18:00:00 GMT-0600
        Transactions:
                Fri Dec 31 2021 18:00:00 GMT-0600 - Initial Balance - 3456 - 3456
                Sat Jan 08 2022 16:29:48 GMT-0600 - Paycheck from Work - 2000 - 5456
                Sat Jan 15 2022 16:29:48 GMT-0600 - Electricity - -54 - 5402
                Sat Jan 22 2022 16:29:48 GMT-0600 - Paycheck from Work - 2000 - 7402
                Sat Feb 05 2022 16:29:48 GMT-0600 - Paycheck from Work - 2000 - 9402
                Tue Feb 15 2022 16:29:48 GMT-0600 - Electricity - -54 - 9348
                Sat Feb 19 2022 16:29:48 GMT-0600 - Paycheck from Work - 2000 - 11348
                Sat Mar 05 2022 16:29:48 GMT-0600 - Paycheck from Work - 2000 - 13348
                Mon Mar 14 2022 19:00:00 GMT-0500 - Doctor Bill from March 15, 2022 - -513.76 - 12834.24
                Tue Mar 15 2022 17:29:48 GMT-0500 - Electricity - -54 - 12780.24
                Sat Mar 19 2022 17:29:48 GMT-0500 - Paycheck from Work - 2000 - 14780.24
                Sat Apr 02 2022 17:29:48 GMT-0500 - Paycheck from Work - 2000 - 16780.239999999998
                Fri Apr 15 2022 17:29:48 GMT-0500 - Electricity - -54 - 16726.239999999998
                Sat Apr 16 2022 17:29:48 GMT-0500 - Paycheck from Work - 2000 - 18726.239999999998
                Sat Apr 30 2022 17:29:48 GMT-0500 - Paycheck from Work - 2000 - 20726.239999999998
                Sun May 01 2022 17:29:48 GMT-0500 - Home Loan - -750 - 19976.239999999998
                Sat May 14 2022 17:29:48 GMT-0500 - Paycheck from Work - 2000 - 21976.239999999998
                Sun May 15 2022 17:29:48 GMT-0500 - Electricity - -54 - 21922.239999999998
                Sat May 28 2022 17:29:48 GMT-0500 - Paycheck from Work - 2000 - 23922.239999999998
                Tue May 31 2022 17:29:48 GMT-0500 - Home Loan - -750 - 23172.239999999998
                Wed Jun 01 2022 17:29:48 GMT-0500 - Water - -27 - 23145.239999999998
                Sat Jun 11 2022 17:29:48 GMT-0500 - Paycheck from Work - 2000 - 25145.239999999998
                Wed Jun 15 2022 17:29:48 GMT-0500 - Electricity - -54 - 25091.239999999998
                Sat Jun 25 2022 17:29:48 GMT-0500 - Paycheck from Work - 2000 - 27091.239999999998
                Thu Jun 30 2022 17:29:48 GMT-0500 - Home Loan - -750 - 26341.239999999998
                Fri Jul 01 2022 17:29:48 GMT-0500 - Water - -27 - 26314.239999999998
                Sat Jul 09 2022 17:29:48 GMT-0500 - Paycheck from Work - 2000 - 28314.239999999998
                Fri Jul 15 2022 17:29:48 GMT-0500 - Electricity - -54 - 28260.239999999998
                Sat Jul 23 2022 17:29:48 GMT-0500 - Paycheck from Work - 2000 - 30260.239999999998
                Sat Jul 30 2022 17:29:48 GMT-0500 - Home Loan - -750 - 29510.239999999998
                Mon Aug 01 2022 17:29:48 GMT-0500 - Water - -27 - 29483.239999999998
                Sat Aug 06 2022 17:29:48 GMT-0500 - Paycheck from Work - 2000 - 31483.239999999998
                Mon Aug 15 2022 17:29:48 GMT-0500 - Electricity - -54 - 31429.239999999998
                Sat Aug 20 2022 17:29:48 GMT-0500 - Paycheck from Work - 2000 - 33429.24
                Mon Aug 29 2022 17:29:48 GMT-0500 - Home Loan - -750 - 32679.239999999998
                Thu Sep 01 2022 17:29:48 GMT-0500 - Water - -27 - 32652.239999999998
                Sat Sep 03 2022 17:29:48 GMT-0500 - Paycheck from Work - 2000 - 34652.24
                Wed Sep 14 2022 19:00:00 GMT-0500 - Doctor Bill from September 15, 2022 - -1203.34 - 33448.9
                Thu Sep 15 2022 17:29:48 GMT-0500 - Electricity - -54 - 33394.9
                Sat Sep 17 2022 17:29:48 GMT-0500 - Paycheck from Work - 2000 - 35394.9
                Wed Sep 28 2022 17:29:48 GMT-0500 - Home Loan - -750 - 34644.9
                Sat Oct 01 2022 17:29:48 GMT-0500 - Water - -27 - 34617.9
                Sat Oct 01 2022 17:29:48 GMT-0500 - Paycheck from Work - 2000 - 36617.9
                Sat Oct 15 2022 17:29:48 GMT-0500 - Electricity - -54 - 36563.9
                Sat Oct 15 2022 17:29:48 GMT-0500 - Paycheck from Work - 2000 - 38563.9
                Fri Oct 28 2022 17:29:48 GMT-0500 - Home Loan - -750 - 37813.9
                Sat Oct 29 2022 17:29:48 GMT-0500 - Paycheck from Work - 2000 - 39813.9
                Tue Nov 01 2022 17:29:48 GMT-0500 - Water - -27 - 39786.9
                Sat Nov 12 2022 16:29:48 GMT-0600 - Paycheck from Work - 2000 - 41786.9
                Tue Nov 15 2022 16:29:48 GMT-0600 - Electricity - -54 - 41732.9
                Sat Nov 26 2022 16:29:48 GMT-0600 - Paycheck from Work - 2000 - 43732.9
                Sun Nov 27 2022 16:29:48 GMT-0600 - Home Loan - -750 - 42982.9
                Thu Dec 01 2022 16:29:48 GMT-0600 - Water - -27 - 42955.9
                Sat Dec 10 2022 16:29:48 GMT-0600 - Paycheck from Work - 2000 - 44955.9
                Thu Dec 15 2022 16:29:48 GMT-0600 - Electricity - -54 - 44901.9
                Sat Dec 24 2022 16:29:48 GMT-0600 - Paycheck from Work - 2000 - 46901.9
                Tue Dec 27 2022 16:29:48 GMT-0600 - Home Loan - -750 - 46151.9
FORECAST: Home Asset
        Lowest Balance: $23000 @ Tue Dec 31 2019 18:00:00 GMT-0600
        Transactions:
                Tue Dec 31 2019 18:00:00 GMT-0600 - Initial Balance - 23000 - 23000
                Sun May 01 2022 17:29:48 GMT-0500 - Home Loan - 750 - 23750
                Tue May 31 2022 17:29:48 GMT-0500 - Home Loan - 750 - 24500
                Thu Jun 30 2022 17:29:48 GMT-0500 - Home Loan - 750 - 25250
                Sat Jul 30 2022 17:29:48 GMT-0500 - Home Loan - 750 - 26000
                Mon Aug 29 2022 17:29:48 GMT-0500 - Home Loan - 750 - 26750
                Wed Sep 28 2022 17:29:48 GMT-0500 - Home Loan - 750 - 27500
                Fri Oct 28 2022 17:29:48 GMT-0500 - Home Loan - 750 - 28250
                Sun Nov 27 2022 16:29:48 GMT-0600 - Home Loan - 750 - 29000
                Tue Dec 27 2022 16:29:48 GMT-0600 - Home Loan - 750 - 29750
Dunzo 🏁
```

## Development
