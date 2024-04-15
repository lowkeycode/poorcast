import { updateBudgetPeriodKeys } from './../../../store/user-account/user-account.actions';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ModalConfig } from 'src/app/models/interfaces';
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
import { ModalService } from '../../shared/services/modal.service';
import { cloneDeep } from 'lodash';
import { ErrorService } from '../../shared/services/error.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnDestroy {
  isLoading = true;
  accounts: Account[] = [];
  budgetPeriods: BudgetPeriods;
  budgetPeriodKeys: string[];
  periodOptions: string[];
  expenses: Expense[] = [];
  stats: AccountStats;
  expenseTotal: number;
  totalAvailable: number;
  subscriptions = new Subscription();

  managePeriodsModalConfig: ModalConfig = {
    title: 'Budget Periods',
    contentList: [],
    contentListActions: {
      delete: (item) => {
        const updatedKeys = this.budgetPeriodKeys.filter(
          (period) => period !== item
        );

        this.store.dispatch(updateBudgetPeriodKeys({ keys: updatedKeys }));
        this.managePeriodsModalConfig.contentList = updatedKeys;
        this.modalService.updateModal(this.managePeriodsModalConfig);
      },
    },
    fieldsets: [
      {
        name: 'Add Period',
        inputs: [
          {
            formControlName: 'start',
            label: 'Start',
            type: 'date',
            hidden: false,
            validators: [],
            dataTest: 'period-start',
          },
          {
            formControlName: 'end',
            label: 'End',
            type: 'date',
            hidden: false,
            validators: [],
            dataTest: 'period-end',
          },
        ],
        button: {
          buttonText: 'Add',
          type: 'neutral',
          dataTest: 'add-category-btn',
          clickFn: (formValue) => {
            const { start, end } = formValue;

            if (!start || !end) {
              return this.errorService.error.next(
                new Error('Select both a start and end date.')
              );
            }

            const startDate = new Date(start + 'T00:00');
            const endDate = new Date(end + 'T00:00');

            const formattedStart = new Intl.DateTimeFormat('en-ca', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }).format(startDate);

            const formattedEnd = new Intl.DateTimeFormat('en-ca', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }).format(endDate);

            const newBudgetPeriodKey = `${formattedStart} - ${formattedEnd}`;

            this.store.dispatch(
              updateBudgetPeriodKeys({
                keys: [...this.budgetPeriodKeys, newBudgetPeriodKey],
              })
            );
            this.managePeriodsModalConfig.contentList = this.budgetPeriodKeys;
            this.modalService.updateModal(this.managePeriodsModalConfig);
          },
        },
      },
    ],
    modalButtons: [
      {
        buttonText: 'Cancel',
        type: 'neutral',
        dataTest: 'modal-cancel-btn',
        clickFn: () => this.modalService.closeModal(),
      },
      {
        buttonText: 'Save',
        type: 'primary',
        dataTest: 'modal-save-btn',
        submitFn: () => {
          // this.store.select(selectUserId).subscribe((id) => {
          //   this.afStore
          //     .collection('users')
          //     .doc(id)
          //     .collection('categories')
          //     .doc(this.categories.id)
          //     .update({ categories: this.categories.categories });
          // });
          this.modalService.closeModal();
        },
      },
    ],
  };

  constructor(
    private store: Store<AppState>,
    private modalService: ModalService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    const sub = this.store.select(selectUserOverview).subscribe((overview) => {
      const [userAcct, stats] = overview;

      if (userAcct.status === 'success') {
        this.accounts = userAcct.accounts;
        this.budgetPeriods = userAcct.budgetPeriods;
        this.budgetPeriodKeys = userAcct.budgetPeriodKeys;
        console.log('this.budgetPeriodKeys', this.budgetPeriodKeys);

        this.stats = stats;
        this.expenses = userAcct.expenses;

        this.expenseTotal = this.expenses.reduce((acc, cur) => {
          const accTotal = cur.remaining ? (acc += cur.remaining) : acc;
          return accTotal;
        }, 0);

        this.stats.projected = stats.netWorth - this.expenseTotal;

        this.periodOptions = Object.entries(this.budgetPeriods)
          .sort((a, b) => a[1][0].seconds - b[1][0].seconds)
          .map((period) => period[0]);

        this.isLoading = false;
      }
    });
    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onManagePeriods() {
    this.managePeriodsModalConfig.contentList = this.budgetPeriodKeys;
    this.modalService.updateModal(this.managePeriodsModalConfig);
  }
}
