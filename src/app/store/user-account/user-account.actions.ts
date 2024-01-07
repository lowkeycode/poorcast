import { createAction, props } from "@ngrx/store";
import { Account, UserAccount } from "./user-account.reducers";

export const loadUserAccount = createAction('[ Global ] Load User Account')

export const loadUserAccountSuccess = createAction('[ Global ] Load User Account Success', props<UserAccount>())

export const loadUserAccountError = createAction('[ Global ] Load Expenses Success', props<any>())

export const getUserAccounts = createAction('[ Global ] Get User Accounts')

export const getUserBudgetPeriods = createAction('[ Global ] Get User Budget Periods')