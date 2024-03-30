import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
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

@Component({
  selector: 'app-budget-accts',
  templateUrl: './budget-accts.component.html',
  styleUrls: ['./budget-accts.component.scss'],
})
export class BudgetAcctsComponent implements OnInit, OnDestroy {
  accounts: Account[];
  expenses: Expense[];
  subscriptions = new Subscription();

  transactionsModalConfig: ModalConfig = {
    title: 'Transactions',
    contentList: [],
    fieldsets: [
      {
        name: 'Transactions',
        inputs: [
          {
            formControlName: 'type',
            label: 'Transaction Type',
            type: 'select',
            hidden: false,
            validators: [Validators.required]
          },
          {
            formControlName: 'amount',
            label: 'Amount',
            type: 'text',
            hidden: false,
            validators: [Validators.required]
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
            validators: [Validators.required]
          },
          {
            formControlName: 'acctType',
            label: 'Account Type',
            type: 'select',
            hidden: false,
            validators: [Validators.required]
          },
          {
            formControlName: 'acctName',
            label: 'Account Balance',
            type: 'text',
            hidden: false,
            validators: [Validators.required]
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
            validators: [Validators.required]
          },
          {
            formControlName: 'fromAcct',
            label: 'Account',
            type: 'select',
            hidden: false,
            validators: [Validators.required]
          },
          {
            formControlName: 'fromAmount',
            label: 'Amount',
            type: 'text',
            hidden: false,
            validators: [Validators.required]
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
            validators: [Validators.required]
          },
          {
            formControlName: 'toAcct',
            label: 'Account',
            type: 'select',
            hidden: false,
            validators: [Validators.required]
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
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    const sub = this.store
      .select(selectUserAccounts)
      .subscribe((accounts) => (this.accounts = accounts));
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
    this.modalService.updateModal(this.transactionsModalConfig);
  }
}
