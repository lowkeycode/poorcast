import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  first,
  forkJoin,
  Subscription,
  switchMap,
} from 'rxjs';
import { ModalConfig } from 'src/app/models/interfaces';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import {
  Account,
  Expense,
} from 'src/app/store/user-account/user-account.reducers';
import {
  AppState,
  selectUserAccounts,
} from 'src/app/store/user-account/user-account.selectors';
import { selectUserId } from 'src/app/store/user/user.selectors';

type TransactionType = 'Deposit' | 'Withdrawal' | 'Transfer';

export interface Deposit {
  acctName: string;
  amount: number;
}

export interface Transfer {
  fromAcct: string;
  toAcct: string;
  amount: number;
}

@Component({
  selector: 'app-budget-accts',
  templateUrl: './budget-accts.component.html',
  styleUrls: ['./budget-accts.component.scss'],
})
export class BudgetAcctsComponent implements OnInit, OnDestroy {
  accounts: Account[];
  expenses: Expense[];
  subscriptions = new Subscription();
  depositModalConfig: ModalConfig;
  transferModalConfig: ModalConfig;

  addAcctModalConfig: ModalConfig = {
    title: 'Add Account',
    contentList: [],
    fieldsets: [
      {
        name: 'Account Info',
        inputs: [
          {
            formControlName: 'acctName',
            label: 'Account Name',
            type: 'text',
            hidden: false,
            validators: [Validators.required],
          },
          {
            formControlName: 'acctType',
            label: 'Account Type',
            type: 'select',
            hidden: false,
            validators: [Validators.required],
          },
          {
            formControlName: 'acctName',
            label: 'Account Balance',
            type: 'text',
            hidden: false,
            validators: [Validators.required],
          },
        ],
      },
    ],
    modalButtons: [
      {
        buttonText: 'Cancel',
        type: 'neutral',
        dataTest: 'modal-cancel-btn',
        clickFn: () => {
          this.modalService.closeModal();
        },
      },
      {
        buttonText: 'Save',
        type: 'primary',
        dataTest: 'modal-save-btn',
        clickFn: () => console.log('Saving'),
      },
    ],
  };

  constructor(
    private modalService: ModalService,
    private store: Store<AppState>,
    private afs: AngularFirestore
  ) {}

  ngOnInit(): void {
    const userAcctSub = this.store
      .select(selectUserAccounts)
      .subscribe((accounts) => {
        this.accounts = accounts;

        console.log(this.accounts);

        this.depositModalConfig = {
          title: 'Transactions',
          contentList: [],
          fieldsets: [
            {
              name: 'Deposit',
              inputs: [
                {
                  formControlName: 'transactionType',
                  label: 'Transaction Type',
                  type: 'select',
                  hidden: false,
                  options: ['Deposit', 'Withdrawal', 'Transfer'],
                  validators: [],
                  onInputChange: (val: TransactionType) => {
                    return this.onTransactionTypeChange(val);
                  },
                },
                {
                  formControlName: 'acctName',
                  label: 'Account',
                  type: 'select',
                  hidden: false,
                  options: this.accounts.map((acct) => acct.acctName),
                  validators: [],
                },
                {
                  formControlName: 'amount',
                  label: 'Amount',
                  type: 'text',
                  hidden: false,
                  validators: [Validators.required],
                },
              ],
            },
          ],
          modalButtons: [
            {
              buttonText: 'Cancel',
              type: 'neutral',
              dataTest: 'modal-cancel-btn',
              clickFn: () => {
                this.modalService.closeModal();
              },
            },
            {
              buttonText: 'Deposit',
              type: 'primary',
              dataTest: 'modal-save-btn',
              submitFn: (payload) => {
                this.store
                  .select(selectUserAccounts)
                  .pipe(
                    first(),
                    switchMap((accts) => {
                      const acctToUpdate = accts.find(
                        (acct) => acct.acctName === payload.acctName
                      ) as Account;

                      const updatedAccount: Account = {
                        ...acctToUpdate,
                        acctBalance:
                          acctToUpdate.acctBalance + Number(payload.amount),
                      };

                      return this.store.select(selectUserId).pipe(
                        switchMap((id) =>
                          this.afs
                            .collection('users')
                            .doc(id)
                            .collection('accounts')
                            .doc(updatedAccount?.id)
                            .update(updatedAccount as Account)
                        )
                      );
                    })
                  )
                  .subscribe(() => this.modalService.closeModal());
              },
            },
          ],
        };

        this.transferModalConfig = {
          title: 'Transactions',
          icon: {
            iconName: 'arrowForward',
            iconSize: 2,
          },
          contentList: [],
          fieldsets: [
            {
              name: 'Transfer From',
              inputs: [
                {
                  formControlName: 'transactionType',
                  label: 'Transaction Type',
                  type: 'select',
                  hidden: false,
                  options: ['Transfer', 'Deposit', 'Withdrawal'],
                  validators: [],
                  onInputChange: (val: TransactionType) => {
                    return this.onTransactionTypeChange(val);
                  },
                },
                {
                  formControlName: 'fromAcct',
                  label: 'Account',
                  type: 'select',
                  hidden: false,
                  options: this.accounts.map((acct) => acct.acctName),
                  validators: [],
                },
                {
                  formControlName: 'amount',
                  label: 'Amount',
                  type: 'text',
                  hidden: false,
                  validators: [Validators.required],
                },
              ],
            },
            {
              name: 'Transfer To',
              inputs: [
                {
                  formControlName: 'toAcct',
                  label: 'Account',
                  type: 'select',
                  hidden: false,
                  options: this.accounts.map((acct) => acct.acctName),
                  validators: [],
                },
              ],
            },
          ],
          modalButtons: [
            {
              buttonText: 'Cancel',
              type: 'neutral',
              dataTest: 'modal-cancel-btn',
              clickFn: () => {
                this.modalService.closeModal();
              },
            },
            {
              buttonText: 'Transfer',
              type: 'primary',
              dataTest: 'modal-save-btn',
              submitFn: (payload) => {
                if (payload.toAcct === payload.fromAcct)
                  return this.modalService.closeModal();

                this.store
                  .select(selectUserAccounts)
                  .pipe(
                    first(),
                    switchMap((accts) => {
                      const toAcct = accts.find(
                        (acct) => acct.acctName === payload.toAcct
                      ) as Account;
                      const updatedToAcct: Account = {
                        ...toAcct,
                        acctBalance: toAcct.acctBalance + Number(payload.amount)
                      }

                      const fromAcct = accts.find(
                        (acct) => acct.acctName === payload.fromAcct
                      ) as Account;
                      const updatedFromAcct: Account = {
                        ...fromAcct,
                        acctBalance: fromAcct.acctBalance + Number(payload.amount)
                      }

                      return this.store.select(selectUserId).pipe(
                        switchMap((id) => {
                          return forkJoin([
                            this.afs
                              .collection('users')
                              .doc(id)
                              .collection('accounts')
                              .doc(updatedToAcct?.id)
                              .update(updatedToAcct),
                            this.afs
                              .collection('users')
                              .doc(id)
                              .collection('accounts')
                              .doc(updatedFromAcct?.id)
                              .update(updatedFromAcct),
                          ]);
                        })
                      );
                    })
                  )
                  .subscribe(() => this.modalService.closeModal());
              },
            },
          ],
        };
      });
    this.subscriptions.add(userAcctSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onAddAccount() {
    this.modalService.updateModal(this.addAcctModalConfig);
  }

  onTransactions() {
    this.modalService.updateModal(this.depositModalConfig);
  }

  onTransactionTypeChange(transactionType: TransactionType) {
    switch (transactionType) {
      case 'Deposit':
        return this.modalService.updateModal(this.depositModalConfig);
      case 'Withdrawal':
        return this.modalService.updateModal(this.depositModalConfig);
      case 'Transfer':
        return this.modalService.updateModal(this.transferModalConfig);
      default:
        break;
    }
  }
}
