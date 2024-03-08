import { createReducer, on } from '@ngrx/store';
import * as UserAccountActions from './user-account.actions';


export interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

export interface Account {
  acctBalance: number;
  acctLimit: number;
  acctName: string;
  acctType: 'chequings' | 'credit' | 'savings' | 'rrsp' | 'loan';
}

export interface Expense {
  id: string;
  name: string;
  amount: number;
  remaining: number;
  due: Timestamp | string;
  notes: string;
  category: string;
}

export interface BudgetPeriods {[key: string]: BudgetPeriod};

export type BudgetPeriod = [Timestamp, Timestamp];

export interface Categories {
  id: string;
  categories: string[]
}

export interface UserAccount {
  accounts: Account[];
  budgetPeriods: {[key: string]: BudgetPeriod};
  expenses: Expense[],
  categories: Categories,
  status: 'pending' | 'loading' | 'error' | 'success';
  error: any;
}

const initialState: UserAccount = {
  accounts: [],
  budgetPeriods: {},
  expenses: [],
  categories: {
    id: '',
    categories: []
  },
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

  on(UserAccountActions.signOutUserAccount, (state) => initialState),

  on(UserAccountActions.updateCategories, (state, categories) => ({...state, categories}))
);
