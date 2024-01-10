import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserAccount } from "./user-account.reducers";

export interface AccountStats {
  netWorth: number;
  creditCards: number;
  loans: number;
  projected: number;
}


const getUserAccount = createFeatureSelector<UserAccount>('userAcct');

export const selectUserAccount = createSelector(getUserAccount, (state) => state);

export const selectUserAccounts = createSelector(getUserAccount, (state) => state.accounts);

export const selectUserBudgetPeriods = createSelector(getUserAccount, (state) => state.budgetPeriods);

export const selectUserExpenses = createSelector(getUserAccount, (state) => state.expenses);

export const selectUserCategories = createSelector(getUserAccount, (state) => state.categories[0].categories);

export const selectUserAccountStats = createSelector(getUserAccount, (userAcct) => {
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