import { createReducer, on } from '@ngrx/store';
import * as UserAccountActions from './user-account.actions';

export interface FirebaseTimestamp {
  seconds: number;
  nanoseconds: number;
}

export interface Account {
  acctBalance: number;
  acctLimit: number;
  acctName: string;
  acctType: 'Chequings' | 'Credit' | 'Savings' | 'RRSP' | 'Loan';
}

export interface BudgetPeriods {[key: string]: BudgetPeriod};

export type BudgetPeriod = [FirebaseTimestamp, FirebaseTimestamp];

export interface UserAccount {
  accounts: Account[];
  budgetPeriods: {[key: string]: BudgetPeriod};
  status: 'pending' | 'loading' | 'error' | 'success';
  error: any;
}

const initialState: UserAccount = {
  accounts: [],
  budgetPeriods: {},
  status: 'pending',
  error: null,
};

export const userAcctReducer = createReducer(
  initialState,
  on(UserAccountActions.loadUserAccount, (state, userAcct) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(UserAccountActions.loadUserAccountSuccess, (state, userAcct) => ({
    ...state,
    ...userAcct,
    status: 'success' as const,
  })),

  on(UserAccountActions.loadUserAccountError, (state, error) => ({...state, error})),
);
