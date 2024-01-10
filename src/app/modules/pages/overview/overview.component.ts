import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import {
  Account,
  BudgetPeriods,
  Expense,
  UserAccount,
} from 'src/app/store/user-account/user-account.reducers';
import {
  selectUserAccounts,
  selectUserBudgetPeriods,
  selectUserExpenses,
} from 'src/app/store/user-account/user-account.selectors';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  isLoading = true;
  accounts: Account[];
  budgetPeriods: BudgetPeriods;
  periodOptions: string[];
  expenses: Expense[];

  constructor(private store: Store<UserAccount>) {}

  ngOnInit(): void {
    combineLatest([
      this.store.select(selectUserAccounts),
      this.store.select(selectUserBudgetPeriods),
      this.store.select(selectUserExpenses),
    ]).subscribe(([accounts, budgetPeriods, expenses]) => {
      this.accounts = accounts;
      this.budgetPeriods = budgetPeriods;
      this.expenses = expenses;

      this.periodOptions = Object.entries(budgetPeriods)
        .sort((a, b) => a[1][0].seconds - b[1][0].seconds)
        .map((period) => period[0]);

      this.expenses = expenses.map((expense) => {
        if (typeof expense.due !== 'string') {
          return { ...expense, due: this.formatDate(expense.due.seconds * 1000) };
        } else {
          return expense
        }
      });

      this.isLoading = false;
    });
  }

  private formatDate(seconds: number) {
    return new Intl.DateTimeFormat('en-CA', {
      weekday: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(seconds));
  }
}
