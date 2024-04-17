import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Account, UserAccount } from 'src/app/store/user-account/user-account.reducers';
import { AppState, selectUserAccount } from 'src/app/store/user-account/user-account.selectors';
import { LoadingService } from '../../shared/services/loading.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  isLoading$ = this.loadingService.isLoading;
  account: UserAccount;

  constructor(private store: Store<AppState>, private loadingService: LoadingService){}

  ngOnInit(): void {
      
    const userAcctSub = this.store
    .select(selectUserAccount)
    .subscribe((account) => {
      this.account = account;
      this.loadingService.isLoading.next(false);
    });
  }
}
