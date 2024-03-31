import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, switchMap } from 'rxjs';
import { ModalConfig } from 'src/app/models/interfaces';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import { depositAccount } from 'src/app/store/user-account/user-account.actions';
import {
  Account,
  Expense,
} from 'src/app/store/user-account/user-account.reducers';
import {
  AppState,
  selectUserAccounts,
} from 'src/app/store/user-account/user-account.selectors';
import { selectUserId } from 'src/app/store/user/user.selectors';

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

  transferModalConfig: ModalConfig = {
    title: 'Transfer',
    icon: {
      iconName: 'arrowForward',
      iconSize: 2,
    },
    contentList: [],
    fieldsets: [
      {
        name: 'From',
        inputs: [
          {
            formControlName: 'fromUser',
            label: 'User',
            type: 'select',
            hidden: false,
            validators: [Validators.required],
          },
          {
            formControlName: 'fromAcct',
            label: 'Account',
            type: 'select',
            hidden: false,
            validators: [Validators.required],
          },
          {
            formControlName: 'fromAmount',
            label: 'Amount',
            type: 'text',
            hidden: false,
            validators: [Validators.required],
          },
        ],
      },
      {
        name: 'To',
        inputs: [
          {
            formControlName: 'toUser',
            label: 'User',
            type: 'select',
            hidden: false,
            validators: [Validators.required],
          },
          {
            formControlName: 'toAcct',
            label: 'Account',
            type: 'select',
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
        buttonText: 'Transfer',
        type: 'primary',
        dataTest: 'modal-save-btn',
        clickFn: () => console.log('Transferring'),
      },
    ],
  };

  constructor(
    private modalService: ModalService,
    private store: Store<AppState>,
    private afs: AngularFirestore
  ) {}

  ngOnInit(): void {
    const sub = this.store.select(selectUserAccounts).subscribe((accounts) => {
      this.accounts = accounts;

      console.log(this.accounts);

      this.depositModalConfig = {
        title: 'Deposit',
        contentList: [],
        fieldsets: [
          {
            name: 'Deposit',
            inputs: [
              {
                formControlName: 'type',
                label: 'Transaction Type',
                type: 'select',
                hidden: false,
                options: ['Deposit', 'Withdrawal', 'Transfer'],
                validators: [Validators.required],
              },
              {
                formControlName: 'acctName',
                label: 'Account',
                type: 'select',
                hidden: false,
                options: this.accounts.map((acct) => acct.acctName),
                validators: [Validators.required],
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
              console.log(payload);

              this.store.dispatch(
                depositAccount({
                  acctName: payload.acctName,
                  amount: Number(payload.amount),
                })
              );

              this.store
                .select(selectUserAccounts)
                .pipe(
                  switchMap((accts) => {
                    const acctToUpdate = accts.find(
                      (acct) => acct.acctName === payload.acctName
                    );
                    return this.store.select(selectUserId).pipe(
                      switchMap((id) =>
                        this.afs
                          .collection('users')
                          .doc(id)
                          .collection('accounts')
                          .doc(acctToUpdate?.id)
                          .update(acctToUpdate as Account)
                      )
                    );
                  })
                )
                .subscribe(() => this.modalService.closeModal());
            },
          },
        ],
      };
    });
    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onAddAccount() {
    this.modalService.updateModal(this.addAcctModalConfig);
  }

  onTransfer() {
    this.modalService.updateModal(this.transferModalConfig);
  }

  onTransactions() {
    this.modalService.updateModal(this.depositModalConfig);
  }
}
