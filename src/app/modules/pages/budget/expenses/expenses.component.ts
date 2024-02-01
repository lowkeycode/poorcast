import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ModalConfig } from 'src/app/models/interfaces';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import { Expense } from 'src/app/store/user-account/user-account.reducers';
import {
  AppState,
  selectUserExpenses,
} from 'src/app/store/user-account/user-account.selectors';
import { selectUserId } from 'src/app/store/user/user.selectors';
import { formatDate } from 'src/app/utils/utils';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit, OnDestroy {
  expenses: Expense[];
  subscriptions = new Subscription();

  payExpenseModalConfig: ModalConfig = {
    title: 'Pay Expense',
    icon: {
      iconName: 'arrowForward',
      iconSize: 2,
    },
    fieldsets: [
      {
        name: 'From',
        inputs: [
          {
            formControlName: 'fromUser',
            label: 'User',
            type: 'select',
            hidden: false,
          },
          {
            formControlName: 'fromAcct',
            label: 'Account',
            type: 'select',
            hidden: false,
          },
          {
            formControlName: 'fromAmount',
            label: 'Amount',
            type: 'text',
            hidden: false,
          },
        ],
      },
      {
        name: 'Expense',
        inputs: [
          {
            formControlName: 'expenseName',
            label: 'Expense',
            type: 'select',
            hidden: false,
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
        buttonText: 'Pay Expense',
        type: 'primary',
        dataTest: 'modal-save-btn',
        clickFn: () => console.log('Transferring'),
      },
    ],
  };

  constructor(
    private modalService: ModalService,
    private store: Store<AppState>,
    private afStore: AngularFirestore
  ) {}

  ngOnInit(): void {
    const sub = this.store.select(selectUserExpenses).subscribe((expenses) => {
      this.expenses = expenses.map((expense) => {
        if (typeof expense.due !== 'string') {
          return { ...expense, due: formatDate(expense.due.seconds * 1000) };
        } else {
          return expense;
        }
      });
    });
    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onPayExpense() {
    this.modalService.updateModal(this.payExpenseModalConfig);
  }

  onAddExpense() {
    const addExpenseModalConfig: ModalConfig = {
      title: 'Add Expense',
      fieldsets: [
        {
          name: 'Expense Info',
          inputs: [
            {
              formControlName: 'name',
              label: 'Expense',
              placeholder: 'Groceries, Rent, etc.',
              type: 'text',
              hidden: false,
            },
            {
              formControlName: 'amount',
              label: 'Amount',
              type: 'text',
              placeholder: '$0.00',
              hidden: false,
            },
            {
              formControlName: 'remaining',
              label: 'Remaining',
              type: 'text',
              placeholder: '$0.00',
              hidden: false,
            },
            {
              formControlName: 'due',
              label: 'Due',
              type: 'date',
              hidden: false,
            },
            {
              formControlName: 'notes',
              label: 'Notes',
              placeholder: 'Additional notes...',
              type: 'text',
              hidden: false,
            },
            {
              formControlName: 'category',
              label: 'Category',
              type: 'select',
              options: ['Update', 'These options'],
              hidden: false,
            },
          ],
        },
      ],
      modalButtons: [
        {
          buttonText: 'Add/Edit Category',
          type: 'neutral',
          dataTest: 'modal-categories-btn',
          clickFn: () => {
            console.log('Going to categories');
          },
        },
        {
          buttonText: 'Save',
          type: 'primary',
          dataTest: 'modal-save-btn',
          submitFn: (payload) => {
            this.store
              .select(selectUserId)
              .subscribe((id) =>
                this.afStore
                  .collection('users')
                  .doc(id)
                  .collection('expenses')
                  .add(payload)
              );
          },
        },
      ],
    };

    this.modalService.updateModal(addExpenseModalConfig);
  }
}
