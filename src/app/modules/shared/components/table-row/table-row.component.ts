import { Component, Input, OnInit } from '@angular/core';
import { ModalConfig } from 'src/app/models/interfaces';
import { ModalService } from '../../services/modal.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppState } from 'src/app/store/user-account/user-account.selectors';
import { Store } from '@ngrx/store';
import { selectUserId } from 'src/app/store/user/user.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss'],
})
export class TableRowComponent {
  @Input() item: any;
  @Input() index: number;
  @Input() isEditable: boolean;
  @Input() collectionName: string;
  private subscriptions = new Subscription();
  private userId: string;

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

  constructor(private modalService: ModalService, private afs: AngularFirestore, private store: Store<AppState>) {}

  ngOnInit() {
    const userIdSub = this.store.select(selectUserId).subscribe(uid => this.userId = uid);
    this.subscriptions.add(userIdSub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onEditExpense(index) {
    this.modalService.updateModal(this.editExpenseModalConfig);
  }

  onDeleteExpense(item: any) {
    this.afs.collection('users').doc(this.userId).collection(this.collectionName).doc(item.id).delete();
  }
}
