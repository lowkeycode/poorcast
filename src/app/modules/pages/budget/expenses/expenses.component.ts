import { ErrorService } from './../../../shared/services/error.service';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first, forkJoin, switchMap } from 'rxjs';
import { ModalConfig } from 'src/app/models/interfaces';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import {
  UserAccount,
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
export class ExpensesComponent implements OnInit {
  @Input() set account(account: UserAccount) {
    this._account = account;
    this.updatePayModalOnInput()
  };

  get account() {
    return this._account;
  }

  isLoading = true;
  currentCategories: string[];

  private _account: UserAccount;
  private manageCategoriesConfig: ModalConfig;
  private payExpenseModalConfig: ModalConfig;

  constructor(
    private modalService: ModalService,
    private store: Store<AppState>,
    private afStore: AngularFirestore,
    private errorService: ErrorService,
  ) {}

  ngOnInit(): void {
    this.currentCategories = [...this.account.categories.categories];
    this.manageCategoriesConfig = {
      title: 'Categories',
      contentList: {},
      contentListActions: {
        delete: (item) => {
          this.currentCategories = this.currentCategories.filter(
            (listItem) => listItem !== item
          );
          
          this.manageCategoriesConfig.contentList = this.currentCategories;
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
  
              const categoryExists = this.currentCategories.find(existingCategory => existingCategory.trim().toLowerCase() === category.trim().toLowerCase());
  
              if(categoryExists) {
                return this.errorService.error.next(new Error('A category with this name already exists. Please provide a unique name.'));
              }

              this.currentCategories = [...this.currentCategories, category]

              this.manageCategoriesConfig.contentList = this.currentCategories;
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

            if(!this.account.categories.id) {
              this.store.select(selectUserId).subscribe((id) => {
                this.afStore
                  .collection('users')
                  .doc(id)
                  .collection('categories')
                  .add({ categories: this.currentCategories })
                  .then(() => {
                    this.currentCategories = this.account.categories.categories
                  });
              });
            } else {
              this.store.select(selectUserId).subscribe((id) => {
                this.afStore
                  .collection('users')
                  .doc(id)
                  .collection('categories')
                  .doc(this.account.categories.id)
                  .update({ categories: this.currentCategories })
                  .then(() => {
                    this.currentCategories = this.account.categories.categories
                  });
              });
            }
            
            this.modalService.closeModal();
          },
        },
      ],
    };
    this.updatePayModalOnInput()
  }

  updatePayModalOnInput() {
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
              options: this._account.accounts.map((acct) => acct.acctName),
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
              options: this._account.expenses
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

                  if (calculatedRemaining < 0) {
                    this.errorService.error.next(
                      new Error('Cannot overpay an expense.')
                    );
                    this.modalService.closeModal();
                  }

                  if (calculatedBalance < 0) {
                    this.errorService.error.next(new Error('Cannot overdraw on the account'));
                    this.modalService.closeModal();
                  }

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
                }
              });
          },
        },
      ],
    };
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
              validators: [],
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
              options: this.account.categories.categories,
              hidden: !this.account.categories.categories.length,
              validators: !this.account.categories.categories.length
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
            const amount = Number(payload.amount);
            const remaining = Number(payload.remaining);

            if(remaining < 0) {
              this.errorService.error.next(new Error('The amount remaining cannot be less than 0.'))
              this.modalService.closeModal();
            }

            if(amount < 0) {
              this.errorService.error.next(new Error('The expense amount cannot be less than 0.'))
              this.modalService.closeModal();
            }

            if(remaining > amount) {
              this.errorService.error.next(new Error('The remaining amount cannot be more than the expense amount.'))
              this.modalService.closeModal();
            }

            const expenseNameExists = this.account.expenses.find(expense => expense.name === payload.name);

            if(expenseNameExists){
              this.errorService.error.next(new Error('An expense with this name already exists. Please provide a unique name.'))
            }

            const formattedPayload = {
              ...payload,
              amount,
              remaining,
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
    this.manageCategoriesConfig.contentList = this.account.categories.categories;
    this.modalService.updateModal(this.manageCategoriesConfig);
  }
}
