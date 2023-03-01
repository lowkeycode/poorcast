import { ModalService } from 'src/app/modules/shared/services/modal.service';
import { Component, OnInit, Input } from '@angular/core';
import { ModalConfig } from 'src/app/models/interfaces';

@Component({
  selector: 'app-expenses-row',
  templateUrl: './expenses-row.component.html',
  styleUrls: ['./expenses-row.component.scss'],
})
export class ExpensesRowComponent implements OnInit {
  @Input() index: number;

  editExpenseModalConfig: ModalConfig = {
    title: 'Edit Expense',
    fieldsets: [
      {
        name: 'Expense Info',
        inputs: [
          {
            formControlName: 'ExpenseName',
            label: 'Expense',
            type: 'text',
            hidden: false,
          },
          {
            formControlName: 'acctType',
            label: 'Due',
            type: 'select',
            hidden: false,
          },
          {
            formControlName: 'expenseAmount',
            label: 'Amount',
            type: 'text',
            hidden: false,
          },
          {
            formControlName: 'expenseNotes',
            label: 'Notes',
            type: 'text',
            hidden: false,
          },
        ],
      },
    ],
    modalButtons: [
      {
        buttonText: 'Cancel',
        type: 'button',
        dataTest: 'modal-cancel-btn',
        clickFn: () => {
          this.modalService.closeModal();
        },
      },
      {
        buttonText: 'Save',
        type: 'submit',
        dataTest: 'modal-save-btn',
        clickFn: () => console.log('Saving'),
      },
    ],
  };

  expense = {
    name: 'Rent',
    amount: 850,
    remaining: 450,
    due: new Date(Date.now()).toISOString(),
    notes: 'Pay the rest on payday',
    category: 'Rent',
  };

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

  onEditExpense(index) {
    //  todo need to figure out how to get the index to pass in. (Do we make name and inputs optional? Or is there a better way)
    this.modalService.openModal(this.editExpenseModalConfig);
  }
}
