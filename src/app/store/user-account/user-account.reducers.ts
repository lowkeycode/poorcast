import { createReducer, on } from '@ngrx/store';
import * as UserAccountActions from './user-account.actions';

interface Account {
  acctBalance: number;
  acctLimit: number;
  acctName: string;
  acctType: 'Chequings' | 'Credit' | 'Savings' | 'RRSP' | 'Loan';
}

type BudgetPeriod = [string, string];

export interface UserAccount {
  accounts: Account[];
  budgetPeriods: BudgetPeriod[];
  status: 'pending' | 'loading' | 'error' | 'success';
  error: any;
}

const initialState = {
  accounts: [],
  budgetPeriods: [],
  status: 'pending',
  error: null
} as UserAccount;

export const userAcctReducer = createReducer(
  initialState,
  on(UserAccountActions.loadUserAccount, (state, userAcct) => ({
    ...state,
    status: 'loading' as const
  })),

  on(UserAccountActions.loadUserAccountSuccess, (state, userAcct) => ({...state, ...userAcct}))
);
