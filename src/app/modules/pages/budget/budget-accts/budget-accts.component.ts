import { Component, OnInit } from '@angular/core';
import { ModalConfig } from 'src/app/models/interfaces';
import { ModalService } from 'src/app/modules/shared/services/modal.service';

@Component({
  selector: 'app-budget-accts',
  templateUrl: './budget-accts.component.html',
  styleUrls: ['./budget-accts.component.scss']
})
export class BudgetAcctsComponent implements OnInit {

  acctModalConfig: ModalConfig = {
    title: 'Add Account',
    fieldsets: [
      {
        name: 'Account Info',
        inputs: [
          {
            formControlName: 'acctName',
            label: 'Account Name',
            type: 'text',
            hidden: false,
          },
          {
            formControlName: 'acctType',
            label: 'Account Type',
            type: 'select',
            hidden: false,
          },
          {
            formControlName: 'acctName',
            label: 'Account Balance',
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

  transferModalConfig: ModalConfig = {
    title: 'Transfer',
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
        name: 'To',
        inputs: [
          {
            formControlName: 'toUser',
            label: 'User',
            type: 'select',
            hidden: false,
          },
          {
            formControlName: 'toAcct',
            label: 'Account',
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
        buttonText: 'Transfer',
        type: 'submit',
        dataTest: 'modal-save-btn',
        clickFn: () => console.log('Transferring'),
      },
    ],
  };

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  onAddAccount() {
    this.modalService.openModal(this.acctModalConfig);
  }

  onTransfer() {
    this.modalService.openModal(this.transferModalConfig);
  }

}
