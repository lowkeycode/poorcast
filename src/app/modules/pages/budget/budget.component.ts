import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Account,
  UserAccount,
} from 'src/app/store/user-account/user-account.reducers';
import {
  AppState,
  selectUserAccount,
} from 'src/app/store/user-account/user-account.selectors';
import { LoadingService } from '../../shared/services/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
})
export class BudgetComponent implements OnInit, OnDestroy {
  isLoading$ = this.loadingService.isLoading;
  account: UserAccount;
  subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    const userAcctSub = this.store
      .select(selectUserAccount)
      .subscribe((account) => {
        if (account.status === 'success') {
          this.account = account;
          this.loadingService.isLoading.next(false);
        }
      });

    this.subscription.add(userAcctSub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
