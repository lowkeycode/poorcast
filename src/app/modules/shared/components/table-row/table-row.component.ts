import { Component, Input, OnInit } from '@angular/core';
import { ModalConfig } from 'src/app/models/interfaces';
import { ModalService } from '../../services/modal.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppState } from 'src/app/store/user-account/user-account.selectors';
import { Store } from '@ngrx/store';
import { selectUserId } from 'src/app/store/user/user.selectors';
import { Subscription } from 'rxjs';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { Timestamp } from 'src/app/store/user-account/user-account.reducers';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss'],
  providers: [FormatDatePipe],
})
export class TableRowComponent {
  @Input() item: any;
  @Input() index: number;
  @Input() isEditable: boolean;
  @Input() collectionName: string;
  @Input() selectOptions: { [key: string]: string[] };
  private subscriptions = new Subscription();
  private userId: string;

  editExpenseModalConfig: ModalConfig;

  constructor(
    private modalService: ModalService,
    private afs: AngularFirestore,
    private store: Store<AppState>,
    public formatDate: FormatDatePipe
  ) {}

  ngOnInit() {
    const userIdSub = this.store
      .select(selectUserId)
      .subscribe((uid) => (this.userId = uid));
    this.subscriptions.add(userIdSub);

    this.editExpenseModalConfig = {
      title: 'Edit Expense',
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
              dataTest: 'name-input'
            },
            {
              formControlName: 'amount',
              label: 'Amount',
              type: 'text',
              placeholder: '$0.00',
              hidden: false,
              validators: [Validators.required],
              dataTest: 'amount-input'
            },
            {
              formControlName: 'remaining',
              label: 'Remaining',
              type: 'text',
              placeholder: '$0.00',
              hidden: false,
              validators: [Validators.required],
              dataTest: 'remaining-input'
            },
            {
              formControlName: 'due',
              label: 'Due',
              type: 'date',
              hidden: false,
              validators: [Validators.required],
              dataTest: 'due-input'
            },
            {
              formControlName: 'notes',
              label: 'Notes',
              placeholder: 'Additional notes...',
              type: 'text',
              hidden: false,
              validators: [],
              dataTest: 'notes-input'
            },
            {
              formControlName: 'category',
              label: 'Category',
              type: 'select',
              hidden: false,
              validators: [Validators.required],
              options: this.selectOptions ? this.selectOptions['categories'] : [],
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
              due: new Date(payload.due)
            }

            this.afs
              .collection('users')
              .doc(this.userId)
              .collection(this.collectionName)
              .doc(this.item.id)
              .update(formattedPayload);
            this.modalService.closeModal();
          },
        },
      ],
    };
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onEditExpense(item: any) {
    const itemKeyVals: Array<[string, string & Timestamp]> =
      Object.entries(item);
    itemKeyVals.forEach((keyVal) => {
      const input = this.editExpenseModalConfig.fieldsets
        .find((fieldset) => fieldset.name === 'Expense Info')
        ?.inputs.find((input) => {
          return input.formControlName === keyVal[0];
        });

      if (input) {
        if (input.type === 'date') {
          input['defaultValue'] = new Date(keyVal[1].seconds * 1000)
            .toISOString()
            .substring(0, 10);
        } else {
          input['defaultValue'] = keyVal[1];
        }
      }
    });

    this.modalService.updateModal(this.editExpenseModalConfig);
  }

  onDeleteExpense(item: any) {
    this.afs
      .collection('users')
      .doc(this.userId)
      .collection(this.collectionName)
      .doc(item.id)
      .delete();
  }
}
