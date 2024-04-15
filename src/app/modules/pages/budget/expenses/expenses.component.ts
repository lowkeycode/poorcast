import { ErrorService } from './../../../shared/services/error.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first, forkJoin, Subscription, switchMap } from 'rxjs';
import { ModalConfig } from 'src/app/models/interfaces';
import { SnackComponent } from 'src/app/modules/shared/components/snack/snack.component';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import { updateCategories } from 'src/app/store/user-account/user-account.actions';
import {
  Account,
  Categories,
  Expense,
} from 'src/app/store/user-account/user-account.reducers';
import {
  AppState,
  selectUserAccount,
} from 'src/app/store/user-account/user-account.selectors';
import { selectUserId } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit, OnDestroy {
  expenses: Expense[];
  accounts: Account[];
  subscriptions = new Subscription();
  categories: Categories;

  manageCategoriesConfig: ModalConfig = {
    title: 'Categories',
    contentList: {},
    contentListActions: {
      delete: (item) => {
        const newList = this.categories.categories.filter(
          (listItem) => listItem !== item
        );
        const updatedCategories = {
          id: this.categories.id,
          categories: [...newList],
        };
        this.store.dispatch(updateCategories(updatedCategories));
        this.manageCategoriesConfig.contentList = this.categories.categories;
        this.modalService.updateModal(this.manageCategoriesConfig);
      },
    },
    fieldsets: [
      {
        name: 'Add Category',
        inputs: [
          {
            formControlName: 'category',
            label: '',
            type: 'text',
            hidden: false,
            validators: [],
            dataTest: 'category',
          },
        ],
        button: {
          buttonText: 'Add',
          type: 'neutral',
          dataTest: 'add-category-btn',
          clickFn: (formValue) => {
            const { category } = formValue;
            this.store.dispatch(
              updateCategories({
                id: this.categories.id,
                categories: [...this.categories.categories, category],
              })
            );
            this.manageCategoriesConfig.contentList = this.categories.categories;
            this.modalService.updateModal(this.manageCategoriesConfig);
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
          this.store.select(selectUserId).subscribe((id) => {
            this.afStore
              .collection('users')
              .doc(id)
              .collection('categories')
              .doc(this.categories.id)
              .update({ categories: this.categories.categories });
          });
          this.modalService.closeModal();
        },
      },
    ],
  };

  private payExpenseModalConfig: ModalConfig;

  constructor(
    private modalService: ModalService,
    private store: Store<AppState>,
    private afStore: AngularFirestore,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    const sub = this.store.select(selectUserAccount).subscribe((acct) => {
      this.expenses = acct.expenses;
      this.categories = acct.categories;
      this.accounts = acct.accounts;

      this.payExpenseModalConfig = {
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
                formControlName: 'fromAcct',
                label: 'Account',
                type: 'select',
                hidden: false,
                options: this.accounts.map((acct) => acct.acctName),
                validators: [],
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
            name: 'Expense',
            inputs: [
              {
                formControlName: 'expenseName',
                label: 'Expense',
                type: 'select',
                hidden: false,
                options: this.expenses
                  .filter((expense) => expense.remaining !== 0)
                  .map((expense) => expense.name),
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
            buttonText: 'Pay Expense',
            type: 'primary',
            dataTest: 'modal-save-btn',
            submitFn: (payload) => {
              this.store
                .select(selectUserAccount)
                .pipe(first())
                .subscribe((acct) => {
                  const targetExpense = acct.expenses.find(
                    (expense) => expense.name === payload.expenseName
                  );
                  const fromAcct = acct.accounts.find(
                    (acct) => acct.acctName === payload.fromAcct
                  );

                  if (targetExpense && fromAcct) {
                    const calculatedRemaining =
                      targetExpense.remaining - Number(payload.fromAmount);

                    const calculatedBalance =
                      fromAcct.acctBalance - Number(payload.fromAmount);

                    if (calculatedRemaining >= 0 && calculatedBalance >= 0) {
                      this.store
                        .select(selectUserId)
                        .pipe(
                          switchMap((id) => {
                            return forkJoin([
                              this.afStore
                                .collection('users')
                                .doc(id)
                                .collection('expenses')
                                .doc(targetExpense.id)
                                .update({
                                  ...targetExpense,
                                  remaining: calculatedRemaining,
                                }),
                              this.afStore
                                .collection('users')
                                .doc(id)
                                .collection('accounts')
                                .doc(fromAcct.id)
                                .update({
                                  ...fromAcct,
                                  acctBalance: calculatedBalance,
                                }),
                            ]);
                          })
                        )
                        .subscribe(() => {
                          this.modalService.closeModal();
                        });
                    } else {
                      this.errorService.error.next(
                        new Error(
                          'There must be enough remaining in the account and the expense cannot be overpaid.'
                        )
                      );
                    }
                  }
                });
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
              validators: [Validators.required],
              dataTest: 'name-input',
            },
            {
              formControlName: 'amount',
              label: 'Amount',
              type: 'text',
              placeholder: '$0.00',
              hidden: false,
              validators: [Validators.required],
              dataTest: 'amount-input',
            },
            {
              formControlName: 'remaining',
              label: 'Remaining',
              type: 'text',
              placeholder: '$0.00',
              hidden: false,
              validators: [Validators.required],
              dataTest: 'remaining-input',
            },
            {
              formControlName: 'due',
              label: 'Due',
              type: 'date',
              hidden: false,
              validators: [Validators.required],
              dataTest: 'due-input',
            },
            {
              formControlName: 'notes',
              label: 'Notes',
              placeholder: 'Additional notes...',
              type: 'text',
              hidden: false,
              validators: [],
              dataTest: 'notes-input',
            },
            {
              formControlName: 'category',
              label: 'Category',
              type: 'select',
              options: this.categories.categories,
              hidden: !this.categories.categories.length,
              validators: !this.categories.categories.length
                ? []
                : [Validators.required],
              dataTest: 'category-input',
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
            const formattedPayload = {
              ...payload,
              amount: Number(payload.amount),
              remaining: Number(payload.remaining),
              due: new Date(payload.due),
              category: payload.category ?? null,
            };
            this.store
              .select(selectUserId)
              .subscribe((id) =>
                this.afStore
                  .collection('users')
                  .doc(id)
                  .collection('expenses')
                  .add(formattedPayload)
              );
            this.modalService.closeModal();
          },
        },
      ],
    };

    this.modalService.updateModal(addExpenseModalConfig);
  }

  manageCategories() {
    this.manageCategoriesConfig.contentList = this.categories.categories;
    this.modalService.updateModal(this.manageCategoriesConfig);
  }
}
