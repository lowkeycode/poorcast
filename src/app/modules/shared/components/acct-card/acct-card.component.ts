import { Component, OnInit, Input } from '@angular/core';
import { ModalConfig } from 'src/app/models/interfaces';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-acct-card',
  templateUrl: './acct-card.component.html',
  styleUrls: ['./acct-card.component.scss'],
})
export class AcctCardComponent implements OnInit {
  @Input() isBudgetCard = false;
  @Input() index: number;

  editAcctModalConfig: ModalConfig = {
    title: 'Edit Account',
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

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

  onEditAcct(index) {
    this.modalService.openModal(this.editAcctModalConfig);
  }
}
