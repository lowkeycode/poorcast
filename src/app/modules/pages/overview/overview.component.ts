import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, forkJoin } from 'rxjs';
import {
  Account,
  BudgetPeriods,
  Expense,
} from 'src/app/store/user-account/user-account.reducers';
import {
  AccountStats,
  AppState,
  selectUserOverview,
} from 'src/app/store/user-account/user-account.selectors';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  isLoading = true;
  accounts: Account[] = [];
  budgetPeriods: BudgetPeriods;
  periodOptions: string[];
  expenses: Expense[] = [];
  stats: AccountStats

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select(selectUserOverview)
      .subscribe((overview) => {
        const [userAcct, stats] = overview;

      this.accounts = userAcct.accounts;
      this.budgetPeriods = userAcct.budgetPeriods;
      this.stats = stats;

      this.expenses = userAcct.expenses.map((expense) => {
        if (typeof expense.due !== 'string') {
          return { ...expense, due: this.formatDate(expense.due.seconds * 1000) };
        } else {
          return expense
        }
      });

      this.stats.projected = stats.netWorth - this.expenses.reduce((acc, cur) => {
        acc += cur.amount;
        return acc;
      }, 0);

      this.periodOptions = Object.entries(this.budgetPeriods)
        .sort((a, b) => a[1][0].seconds - b[1][0].seconds)
        .map((period) => period[0]);
      

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
