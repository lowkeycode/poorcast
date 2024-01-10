import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserAccount } from "./user-account.reducers";
import firebase from 'firebase/compat/app';

export interface AccountStats {
  netWorth: number;
  creditCards: number;
  loans: number;
  projected: number;
}

export interface AppState {
  user: firebase.User;
  userAcct: UserAccount
}


const getUserAccount = createFeatureSelector<UserAccount>('userAcct');

const getUserAccount2 = (state: AppState) => state.userAcct;

export const selectUserAccount2 = createSelector(getUserAccount2, (state) => state);

export const selectUserAccount = createSelector(getUserAccount, (state) => state);

export const selectUserAccounts = createSelector(getUserAccount, (state) => state.accounts);

export const selectUserBudgetPeriods = createSelector(getUserAccount, (state) => state.budgetPeriods);

export const selectUserExpenses = createSelector(getUserAccount, (state) => state.expenses);

export const selectUserCategories = createSelector(getUserAccount, (state) => state.categories[0].categories);

export const selectUserAccountStats = createSelector(getUserAccount2, (userAcct) => {
  let stats: AccountStats = {
    netWorth: 0,
    creditCards: 0,
    loans: 0,
    projected: 0
  };

  stats = userAcct.accounts.reduce((acc, cur) => {
    acc = {
      netWorth: cur.acctLimit ? acc.netWorth - cur.acctBalance : acc.netWorth + cur.acctBalance,
      creditCards: cur.acctLimit && cur.acctType === 'credit' ? acc.creditCards + cur.acctBalance : acc.creditCards,
      loans: cur.acctLimit && cur.acctType === 'loan' ? acc.loans + cur.acctBalance : acc.loans,
      projected: acc.projected
    }
    return acc;
  }, stats);

  return [userAcct, stats];
})