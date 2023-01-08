import { Component, OnInit } from '@angular/core';
import { ModalConfig } from 'src/app/models/interfaces';
import { ModalService } from 'src/app/modules/shared/services/modal.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {

  payBillModalConfig: ModalConfig = {
    title: 'Pay Bill',
    icon: {
      iconName: 'arrowForward',
      iconSize: 2
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
        name: 'Bill',
        inputs: [
          {
            formControlName: 'billName',
            label: 'Bill',
            type: 'select',
            hidden: false,
          },
        ],
      }
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
        buttonText: 'Pay Bill',
        type: 'submit',
        dataTest: 'modal-save-btn',
        clickFn: () => console.log('Transferring'),
      },
    ],
  };

  addBillModalConfig: ModalConfig = {
    title: 'Add Bill',
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
      }
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

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  onPayBill() {
    this.modalService.openModal(this.payBillModalConfig);
  }

  onAddBill() {
    this.modalService.openModal(this.addBillModalConfig);
  }

}
