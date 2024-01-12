import { createSelector } from '@ngrx/store';
import { UserAccount } from './user-account.reducers';
import firebase from 'firebase/compat/app';

export interface AccountStats {
  netWorth: number;
  creditCards: number;
  loans: number;
  totalAvailable: number;
  projected: number;
}

export interface AppState {
  user: firebase.User;
  userAcct: UserAccount;
}

const getUserAccount = (state: AppState) => state.userAcct;

export const selectUserAccount = createSelector(
  getUserAccount,
  (state) => state
);

export const selectUserAccounts = createSelector(
  getUserAccount,
  (state) => state.accounts
);

export const selectUserBudgetPeriods = createSelector(
  getUserAccount,
  (state) => state.budgetPeriods
);

export const selectUserExpenses = createSelector(
  getUserAccount,
  (state) => state.expenses
);

export const selectUserCategories = createSelector(
  getUserAccount,
  (state) => state.categories[0].categories
);

export const selectUserOverview = createSelector(getUserAccount, (userAcct):[UserAccount, AccountStats] => {
  let stats: AccountStats = {
    netWorth: 0,
    creditCards: 0,
    loans: 0,
    totalAvailable: 0,
    projected: 0,
  };

  stats = userAcct.accounts.reduce((acc, cur) => {
    let totalAvailable = 0;

    if(cur.acctLimit) {
      totalAvailable += cur.acctLimit - cur.acctBalance;
    } else {
      totalAvailable += cur.acctBalance;
    }

    const newStats: AccountStats = {
      netWorth: cur.acctLimit
        ? acc.netWorth - cur.acctBalance
        : acc.netWorth + cur.acctBalance,
      creditCards:
        cur.acctLimit && cur.acctType === 'credit'
          ? acc.creditCards + cur.acctBalance
          : acc.creditCards,
      loans:
        cur.acctLimit && cur.acctType === 'loan'
          ? acc.loans + cur.acctBalance
          : acc.loans,
      totalAvailable: acc.totalAvailable + totalAvailable,
      projected: acc.projected,
    };
    return newStats;
  }, stats);

  console.log('stats', stats);
  

  return [userAcct, stats];
});
