import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first, forkJoin, of, Subscription, switchMap } from 'rxjs';
import { ModalConfig } from 'src/app/models/interfaces';
import { ErrorService } from 'src/app/modules/shared/services/error.service';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import {
  Account,
  AcctType,
  UserAccount,
} from 'src/app/store/user-account/user-account.reducers';
import {
  AppState,
  selectUserAccounts,
} from 'src/app/store/user-account/user-account.selectors';
import { selectUserId } from 'src/app/store/user/user.selectors';

export type TransactionType = 'Deposit' | 'Withdrawal' | 'Transfer';

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
  @Input() account: UserAccount;
  acctTypes = ['chequings', 'credit', 'savings', 'rrsp', 'loan'].map(
    (acctType) => {
      if (acctType === 'rrsp') return acctType.toUpperCase();
      return acctType[0].toUpperCase() + acctType.slice(1);
    }
  );
  private subscriptions = new Subscription();
  private depositModalConfig: ModalConfig;
  private transferModalConfig: ModalConfig;
  private withdrawalModalConfig: ModalConfig;
  private addAcctModalConfig: ModalConfig;

  constructor(
    private modalService: ModalService,
    private store: Store<AppState>,
    private afs: AngularFirestore,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
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
              onInputChange: (val: TransactionType) =>
                this.onTransactionTypeChange(val),
            },
            {
              formControlName: 'acctName',
              label: 'Account',
              type: 'select',
              hidden: false,
              options: this.account.accounts.map((acct) => acct.acctName),
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
            const amount = Number(payload.amount);

            this.store
              .select(selectUserAccounts)
              .pipe(
                first(),
                switchMap((accts) => {
                  const acctToUpdate = accts.find(
                    (acct) => acct.acctName === payload.acctName
                  ) as Account;

                  if(acctToUpdate.acctType === 'credit' || acctToUpdate.acctType === 'loan') {
                    if(acctToUpdate.acctBalance - amount < 0) {
                      this.errorService.error.next(new Error('Cannot deposit over the account limit on loan or credit accounts.'));
                      return of(null);
                    }
                  }

                  const updatedAccount: Account = {
                    ...acctToUpdate,
                    acctBalance:
                      acctToUpdate.acctBalance + amount,
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
              options: this.account.accounts.map((acct) => acct.acctName),
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
              options: this.account.accounts.map((acct) => acct.acctName),
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
            const amount = Number(payload.amount);
            this.store
              .select(selectUserAccounts)
              .pipe(
                first(),
                switchMap((accts) => {
                  const toAcct = accts.find(
                    (acct) => acct.acctName === payload.toAcct
                  ) as Account;
                  const fromAcct = accts.find(
                    (acct) => acct.acctName === payload.fromAcct
                  ) as Account;

                  console.log({payload, fromAcct, toAcct});

                  if(fromAcct.acctName === toAcct.acctName) {
                    this.errorService.error.next(new Error('Cannot transfer to the same account.'))
                    return of('null')
                  }

                  if(fromAcct.acctBalance - amount < 0) {
                    this.errorService.error.next(new Error('Cannot overdraw on the account transferring from.'))
                    return of(null)
                  }

                  console.log(toAcct.acctBalance + amount);
                  console.log(toAcct?.acctLimit);
                  


                  if(toAcct?.acctLimit) {
                    if(toAcct.acctBalance + amount > toAcct.acctLimit) {
                      
                      this.errorService.error.next(new Error('Cannot transfer to an account with an amount that will be over the limit on loan or credit accounts.'));
                      return of(null);
                    }
                  }


                  const updatedFromAcct: Account = {
                    ...fromAcct,
                    acctBalance:
                      fromAcct.acctBalance - amount,
                  };
                  const updatedToAcct: Account = {
                    ...toAcct,
                    acctBalance:
                      toAcct.acctBalance + amount,
                  };



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

    this.withdrawalModalConfig = {
      title: 'Transactions',
      contentList: [],
      fieldsets: [
        {
          name: 'Withdrawal',
          inputs: [
            {
              formControlName: 'transactionType',
              label: 'Transaction Type',
              type: 'select',
              hidden: false,
              options: ['Withdrawal', 'Deposit', 'Transfer'],
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
              options: this.account.accounts.map((acct) => acct.acctName),
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
          buttonText: 'Withdraw',
          type: 'primary',
          dataTest: 'modal-save-btn',
          submitFn: (payload) => {
            const amount = Number(payload.amount);
            this.store
              .select(selectUserAccounts)
              .pipe(
                first(),
                switchMap((accts) => {
                  const acctToUpdate = accts.find(
                    (acct) => acct.acctName === payload.acctName
                  ) as Account;

                  if(acctToUpdate.acctBalance - amount < 0) {
                    this.errorService.error.next(new Error('Cannot overdraw on the account.'))
                    return of(null);
                  }

                  const updatedAccount: Account = {
                    ...acctToUpdate,
                    acctBalance:
                      acctToUpdate.acctBalance - Number(payload.amount),
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

    this.addAcctModalConfig = {
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
              placeholder: 'Account name',
              validators: [Validators.required],
            },
            {
              formControlName: 'acctType',
              label: 'Account Type',
              type: 'select',
              hidden: false,
              placeholder: 'Account type',
              options: this.acctTypes,
              onInputChange: (val: AcctType) =>
                this.onAddAccountTypeChange(val),
              validators: [Validators.required],
              defaultValue: 'Chequings'
            },
            {
              formControlName: 'acctBalance',
              label: 'Account Balance',
              type: 'text',
              hidden: false,
              placeholder: 'Account balance',
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
          submitFn: (payload) => {
            const acctBalance = Number(payload.acctBalance);

            let newAcct = {
              acctBalance,
              acctName: payload.acctName,
              acctType: payload.acctType.toLowerCase() as AcctType,
            };

            const accountNameExists = this.account.accounts.find(acct => acct.acctName === payload.acctName);

            if(accountNameExists) {
              this.errorService.error.next(new Error('An account with this name already exists. Please provide a unique name.'));
              this.modalService.closeModal();
            }

            if('acctLimit' in payload) {
              const acctLimit = payload.acctLimit;
              if(acctLimit <= 0) {
                this.errorService.error.next(new Error('Account limit must be greater than 0.'));
                this.modalService.closeModal();
              }

              if(acctBalance > acctLimit) {
                this.errorService.error.next(new Error('Account balance cannot be greater than the account limit.'))
                this.modalService.closeModal();
              }

              newAcct = {
                ...newAcct,
                acctLimit: Number(payload.acctLimit),
              } as any;
            }

            if(acctBalance < 0) {
              this.errorService.error.next(new Error('Account balance cannot be less than 0.'))
              this.modalService.closeModal();
            }

            this.store
              .select(selectUserId)
              .pipe(
                switchMap((id) =>
                  this.afs
                    .collection('users')
                    .doc(id)
                    .collection('accounts')
                    .add(newAcct)
                )
              )
              .subscribe(() => this.modalService.closeModal());
          },
        },
      ],
    };
  
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
        return this.modalService.updateModal(this.withdrawalModalConfig);
      case 'Transfer':
        return this.modalService.updateModal(this.transferModalConfig);
      default:
        break;
    }
  }

  onAddAccountTypeChange(acctType: AcctType) {
    const acctTypeInput = this.addAcctModalConfig.fieldsets[0].inputs.find(input => input.formControlName === 'acctType');
    if(acctTypeInput) acctTypeInput['defaultValue'] = acctType[0].toUpperCase() + acctType.slice(1);

    switch (acctType) {
      case 'credit':
        if (this.addAcctModalConfig.fieldsets[0].inputs.length === 4) {
          return this.modalService.updateModal(this.addAcctModalConfig);
        }

        this.addAcctModalConfig.fieldsets[0].inputs.push({
          formControlName: 'acctLimit',
          label: 'Account Limit',
          type: 'text',
          hidden: false,
          placeholder: 'Account limit',
          validators: [Validators.required],
        });
        return this.modalService.updateModal(this.addAcctModalConfig);

      case 'loan':
        if (this.addAcctModalConfig.fieldsets[0].inputs.length === 4) {
          return this.modalService.updateModal(this.addAcctModalConfig);
        }

        this.addAcctModalConfig.fieldsets[0].inputs.push({
          formControlName: 'acctLimit',
          label: 'Account Limit',
          type: 'text',
          hidden: false,
          placeholder: 'Account limit',
          validators: [Validators.required],
        });
        return this.modalService.updateModal(this.addAcctModalConfig);

      default:
        if (this.addAcctModalConfig.fieldsets[0].inputs.length === 3) {
          return this.modalService.updateModal(this.addAcctModalConfig);
        }

        this.addAcctModalConfig.fieldsets[0].inputs.pop();
        return this.modalService.updateModal(this.addAcctModalConfig);
    }
  }
}
