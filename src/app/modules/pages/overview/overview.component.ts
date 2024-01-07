import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import {
  Account,
  BudgetPeriods,
  UserAccount,
} from 'src/app/store/user-account/user-account.reducers';
import {
  selectUserAccounts,
  selectUserBudgetPeriods,
} from 'src/app/store/user-account/user-account.selectors';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  accounts: Account[];
  budgetPeriods: BudgetPeriods;
  periodOptions: string[];

  constructor(private store: Store<UserAccount>) {}

  ngOnInit(): void {
    combineLatest([
      this.store.select(selectUserAccounts),
      this.store.select(selectUserBudgetPeriods),
    ]).subscribe(([accounts, budgetPeriods]) => {
      this.accounts = accounts;
      this.budgetPeriods = budgetPeriods;

      this.periodOptions = Object.entries(budgetPeriods)
        .sort((a, b) => a[1][0].seconds - b[1][0].seconds)
        .map((period) => period[0]);
    });
  }
}
