import { createReducer, on } from '@ngrx/store';
import * as UserAccountActions from './user-account.actions';

export interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

export type AcctType = 'chequings' | 'credit' | 'savings' | 'rrsp' | 'loan';

export interface Account {
  id: string;
  acctBalance: number;
  acctLimit?: number;
  acctName: string;
  acctType: AcctType;
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

export interface BudgetPeriods {
  [key: string]: BudgetPeriod;
}

export type BudgetPeriod = [Timestamp, Timestamp];

export interface Categories {
  id: string;
  categories: string[];
}

export interface BudgetPeriodKeys {
  keys: string[];
}

export interface UserAccount {
  accounts: Account[];
  budgetPeriods: { [key: string]: BudgetPeriod };
  budgetPeriodKeys: string[];
  expenses: Expense[];
  categories: Categories;
  status: 'pending' | 'loading' | 'error' | 'success';
  error: any;
}

const initialState: UserAccount = {
  accounts: [],
  budgetPeriods: {},
  budgetPeriodKeys: [],
  expenses: [],
  categories: {
    id: '',
    categories: [],
  },
  status: 'pending',
  error: null,
};

export const userAcctReducer = createReducer(
  initialState,
  on(UserAccountActions.loadUserAccount, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(UserAccountActions.loadUserAccountSuccess, (state, userAcct) => ({
    ...state,
    ...userAcct,
    status: 'success' as const,
  })),

  on(UserAccountActions.loadUserAccountError, (state, error) => ({
    ...state,
    error,
  })),

  on(UserAccountActions.signOutUserAccount, () => initialState),

  on(UserAccountActions.updateCategories, (state, categories) => ({
    ...state,
    categories,
  })),

  on(UserAccountActions.updateBudgetPeriodKeys, (state, budgetPeriodKeys) => ({
    ...state,
    budgetPeriodKeys: budgetPeriodKeys.keys,
  }))
);
