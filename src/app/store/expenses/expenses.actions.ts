import { createAction, props } from "@ngrx/store";

interface Expenses {
  [key: number ]: {}
}

export const loadExpenses = createAction('[ Global ] Load Expenses')

export const loadExpensesSuccess = createAction('[ Global ] Load Expenses Success', props<Expenses>() )