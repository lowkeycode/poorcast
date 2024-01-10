import { Component, Input, OnInit } from '@angular/core';
import { ModalConfig } from 'src/app/models/interfaces';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent {
  @Input() item: any;
  @Input() index: number;
  @Input() isEditable: boolean;

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

  constructor(private modalService: ModalService) {
  }

  onEditExpense(index) {
    //  todo need to figure out how to get the index to pass in. (Do we make name and inputs optional? Or is there a better way)
    this.modalService.openModal(this.editExpenseModalConfig);
  }

}
