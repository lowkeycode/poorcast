import { createAction, props } from "@ngrx/store";
import { UserAccount } from "./user-account.reducers";

export const loadUserAccount = createAction('[ Global ] Load User Account')

export const loadUserAccountSuccess = createAction('[ Global ] Load User Account Success', props<UserAccount>())

export const loadUserAccountError = createAction('[ Global ] Load Expenses Success', props<any>())