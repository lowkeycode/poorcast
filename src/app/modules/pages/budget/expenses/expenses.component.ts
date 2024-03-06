import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ModalConfig } from 'src/app/models/interfaces';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import { Category, Expense } from 'src/app/store/user-account/user-account.reducers';
import {
  AppState,
  selectUserAccount,
  selectUserExpenses,
} from 'src/app/store/user-account/user-account.selectors';
import { selectUserId } from 'src/app/store/user/user.selectors';

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
    contentList: [],
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
        name: 'Expense',
        inputs: [
          {
            formControlName: 'expenseName',
            label: 'Expense',
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
        buttonText: 'Pay Expense',
        type: 'primary',
        dataTest: 'modal-save-btn',
        clickFn: () => console.log('Transferring'),
      },
    ],
  };

  manageCategoriesConfig: ModalConfig = {
    title: 'Categories',
    contentList: [],
    fieldsets: [{
      name: 'Add Category',
      inputs: [
        {
          formControlName: 'category',
          label: '',
          type: 'text',
          hidden: false,
          validators: []
        }
      ],
      button: {
        buttonText: 'Add',
        type: 'neutral',
        dataTest: 'add-category-btn',
        clickFn: (modal, formValue) => {
          const category = formValue.category as string;
          if(!category) return;
          this.manageCategoriesConfig.contentList = [...modal.contentList, category];
          this.modalService.updateModal(this.manageCategoriesConfig);
        }
      }

    }],
    modalButtons: [
      {
        buttonText: 'Cancel',
        type: 'neutral',
        dataTest:'modal-cancel-btn',
        clickFn: () => this.modalService.closeModal()
      },
      {
        buttonText: 'Save',
        type: 'primary',
        dataTest:'modal-save-btn',
        clickFn: () => console.log('saving')
      },
    ],
  }
  categories: Category[];

  constructor(
    private modalService: ModalService,
    private store: Store<AppState>,
    private afStore: AngularFirestore
  ) {}

  ngOnInit(): void {
    const sub = this.store
      .select(selectUserAccount)
      .subscribe((acct) => {
        this.expenses = acct.expenses
        this.categories = acct.categories;
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
      contentList: [],
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
              validators: [Validators.required]
            },
            {
              formControlName: 'amount',
              label: 'Amount',
              type: 'text',
              placeholder: '$0.00',
              hidden: false,
              validators: [Validators.required]
            },
            {
              formControlName: 'remaining',
              label: 'Remaining',
              type: 'text',
              placeholder: '$0.00',
              hidden: false,
              validators: [Validators.required]
            },
            {
              formControlName: 'due',
              label: 'Due',
              type: 'date',
              hidden: false,
              validators: [Validators.required]
            },
            {
              formControlName: 'notes',
              label: 'Notes',
              placeholder: 'Additional notes...',
              type: 'text',
              hidden: false,
              validators: [Validators.required]
            },
            {
              formControlName: 'category',
              label: 'Category',
              type: 'select',
              options: ['Update', 'These options'],
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

  manageCategories() {
    this.manageCategoriesConfig.contentList = this.categories[0].categories;
    this.modalService.updateModal(this.manageCategoriesConfig);
  }
}
