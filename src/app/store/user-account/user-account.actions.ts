import { createAction, props } from "@ngrx/store";
import { Categories, UserAccount } from "./user-account.reducers";

export const loadUserAccount = createAction('[ Global ] Load User Account')

export const loadUserAccountSuccess = createAction('[ Global ] Load User Account Success', props<UserAccount>())

export const loadUserAccountError = createAction('[ Global ] Load User Account Error', props<any>())

export const getUserAccounts = createAction('[ Global ] Get User Accounts')

export const getUserBudgetPeriods = createAction('[ Global ] Get User Budget Periods')

export const signOutUserAccount = createAction('[ Global ] Sign Out User Account')

export const updateCategories = createAction('[ Expenses Page ] Update Categories', props<Categories>())