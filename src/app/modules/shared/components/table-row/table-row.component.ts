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
    console.log(this.item);
    
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
              type: 'text',
              hidden: false,
              validators: [Validators.required],
            },
            {
              formControlName: 'amount',
              label: 'Amount',
              type: 'text',
              hidden: false,
              validators: [Validators.required],
            },
            {
              formControlName: 'remaining',
              label: 'Remaining',
              type: 'text',
              hidden: false,
              validators: [Validators.required],
            },
            {
              formControlName: 'due',
              label: 'Due',
              type: 'date',
              hidden: false,
              validators: [Validators.required],
            },
            {
              formControlName: 'notes',
              label: 'Notes',
              type: 'text',
              hidden: false,
              validators: [],
            },
            {
              formControlName: 'category',
              label: 'Category',
              type: 'select',
              hidden: false,
              validators: [Validators.required],
              options: this.selectOptions['categories'],
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
            console.log(payload);
            console.log(new Date(payload.due));

            this.afs
              .collection('users')
              .doc(this.userId)
              .collection(this.collectionName)
              .doc(this.item.id)
              .update({ ...payload, due: new Date(payload.due) });
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
