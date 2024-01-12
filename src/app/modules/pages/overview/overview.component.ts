import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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
import { formatDate } from 'src/app/utils/utils';

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
  expenseTotal: number;
  totalAvailable: number;

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
          return { ...expense, due: formatDate(expense.due.seconds * 1000) };
        } else {
          return expense
        }
      });

      this.expenseTotal = this.expenses.reduce((acc, cur) => {
        const accTotal = cur.remaining ? acc += cur.remaining : acc;
        return accTotal;
      }, 0);

      this.stats.projected = stats.netWorth - this.expenseTotal;

      this.periodOptions = Object.entries(this.budgetPeriods)
        .sort((a, b) => a[1][0].seconds - b[1][0].seconds)
        .map((period) => period[0]);
      

      this.isLoading = false;
      });
    
  }
}
