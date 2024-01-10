import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserAccount } from "./user-account.reducers";


const getUserAccount = createFeatureSelector<UserAccount>('userAcct');

export const selectUserAccount = createSelector(getUserAccount, (state) => state);

export const selectUserAccounts = createSelector(getUserAccount, (state) => state.accounts);

export const selectUserBudgetPeriods = createSelector(getUserAccount, (state) => state.budgetPeriods);

export const selectUserExpenses = createSelector(getUserAccount, (state) => state.expenses);

export const selectUserCategories = createSelector(getUserAccount, (state) => state.categories[0].categories);