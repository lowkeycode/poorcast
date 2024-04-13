import { Component, OnInit, Input } from '@angular/core';
import { ModalConfig } from 'src/app/models/interfaces';
import { ModalService } from '../../services/modal.service';
import { Account } from 'src/app/store/user-account/user-account.reducers';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectUserId } from 'src/app/store/user/user.selectors';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-acct-card',
  templateUrl: './acct-card.component.html',
  styleUrls: ['./acct-card.component.scss'],
})
export class AcctCardComponent implements OnInit {
  @Input() isBudgetCard = false;
  @Input() account: Account;
  @Input() index: number;
  @Input() selectOptions: { [key: string]: string[] };
  private editAcctModalConfig: ModalConfig;
  private userId: string;

  constructor(
    private modalService: ModalService,
    private store: Store,
    private afs: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.store.select(selectUserId).subscribe((id) => (this.userId = id));

    this.editAcctModalConfig = {
      title: 'Edit Account',
      contentList: [],
      fieldsets: [
        {
          name: 'Account Info',
          inputs: [
            {
              formControlName: 'acctName',
              label: 'Account Name',
              type: 'text',
              hidden: false,
              validators: [Validators.required],
            },
            {
              formControlName: 'acctType',
              label: 'Account Type',
              type: 'select',
              hidden: false,
              options: this.selectOptions['acctTypes'],
              validators: [Validators.required],
            },
            {
              formControlName: 'acctBalance',
              label: 'Account Balance',
              type: 'text',
              hidden: false,
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
          buttonText: 'Save',
          type: 'primary',
          dataTest: 'modal-save-btn',
          submitFn: (payload: Account) => {
            let formattedPayload = {
              ...payload,
              acctBalance: Number(payload.acctBalance),
            };

            if (payload?.acctLimit) {
              formattedPayload = {
                ...formattedPayload,
                acctLimit: Number(payload.acctLimit),
              };
            }

            this.afs
              .collection('users')
              .doc(this.userId)
              .collection('accounts')
              .doc(payload.id)
              .update(formattedPayload);
            this.modalService.closeModal();
          },
        },
      ],
    };
  }

  onDeleteAcct(account: Account) {
    this.afs
      .collection('users')
      .doc(this.userId)
      .collection('accounts')
      .doc(account.id)
      .delete();
  }

  onEditAcct(account: Account) {
    console.log(account);
    if (account?.acctLimit) {
      this.editAcctModalConfig.fieldsets[0].inputs.push({
        formControlName: 'acctLimit',
        label: 'Account Limit',
        type: 'text',
        hidden: false,
        validators: [Validators.required],
      });
    }

    const acctKeyVals: Array<[string, string]> = Object.entries(account);

    acctKeyVals.forEach((keyVal) => {
      const input = this.editAcctModalConfig.fieldsets[0].inputs.find(
        (input) => {
          return input.formControlName === keyVal[0];
        }
      );

      if (input) {
        input['defaultValue'] = keyVal[1];
      }
    });

    this.modalService.updateModal(this.editAcctModalConfig);
  }
}
