import { Component, OnInit, Input } from '@angular/core';
import { ModalConfig } from 'src/app/models/interfaces';
import { ModalService } from '../../services/modal.service';
import { Account } from 'src/app/store/user-account/user-account.reducers';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-acct-card',
  templateUrl: './acct-card.component.html',
  styleUrls: ['./acct-card.component.scss'],
})
export class AcctCardComponent implements OnInit {
  @Input() isBudgetCard = false;
  @Input() account: Account;
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
            validators: [Validators.required]
          },
          {
            formControlName: 'acctType',
            label: 'Account Type',
            type: 'select',
            hidden: false,
            validators: [Validators.required]
          },
          {
            formControlName: 'acctName',
            label: 'Account Balance',
            type: 'text',
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
        clickFn: () => console.log('Saving'),
      },
    ],
  };

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

  onEditAcct(index) {
    this.modalService.updateModal(this.editAcctModalConfig);
  }
}
