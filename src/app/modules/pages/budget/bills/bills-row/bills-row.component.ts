import { ModalService } from 'src/app/modules/shared/services/modal.service';
import { Component, OnInit, Input } from '@angular/core';
import { ModalConfig } from 'src/app/models/interfaces';

@Component({
  selector: 'app-bills-row',
  templateUrl: './bills-row.component.html',
  styleUrls: ['./bills-row.component.scss'],
})
export class BillsRowComponent implements OnInit {
  @Input() index: number;

  editBillModalConfig: ModalConfig = {
    title: 'Edit Bill',
    fieldsets: [
      {
        name: 'Bill Info',
        inputs: [
          {
            formControlName: 'billName',
            label: 'Bill',
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
            formControlName: 'billAmount',
            label: 'Amount',
            type: 'text',
            hidden: false,
          },
          {
            formControlName: 'billNotes',
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

  bill = {
    name: 'Rent',
    amount: 850,
    remaining: 450,
    due: new Date(Date.now()).toISOString(),
    notes: 'Pay the rest on payday',
    tag: 'Rent',
  };

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

  onEditBill(index) {
    //  todo need to figure out how to get the index to pass in. (Do we make name and inputs optional? Or is there a better way)
    this.modalService.openModal(this.editBillModalConfig);
  }
}
