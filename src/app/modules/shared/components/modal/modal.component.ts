import { ModalService } from './../../services/modal.service';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ModalConfig, PayloadFunction } from 'src/app/models/interfaces';
import { TextInputComponent } from '../forms/text-input/text-input.component';
import { SelectInputComponent } from '../forms/select-input/select-input.component';
import {
  AcctType,
} from 'src/app/store/user-account/user-account.reducers';
import { TransactionType } from 'src/app/modules/pages/budget/budget-accts/budget-accts.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  @ViewChildren(TextInputComponent)
  genericInputs: QueryList<TextInputComponent>;
  @ViewChildren(SelectInputComponent)
  selectInputs: QueryList<SelectInputComponent>;

  modal$: Observable<ModalConfig | null>;
  form!: UntypedFormGroup;
  formSub: Subscription;
  contentList: string[];

  private modal: ModalConfig | null;
  private submitFn: PayloadFunction;
  private subs = new Subscription();
  private currentTransactionType: TransactionType = 'Deposit';
  private currentAccountType: AcctType = 'chequings';

  constructor(
    private modalService: ModalService,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.modal$ = this.modalService.modalState$;
    const modalSub = this.modal$.subscribe((modal) => {
      this.modal = modal;
      this.contentList = this.modal?.contentList;

      this.submitFn = this.modal?.modalButtons.find(
        (button) => button.type === 'primary'
      )?.submitFn as PayloadFunction;
      
      const group = {} as UntypedFormGroup;
      
      modal?.fieldsets[0].inputs.forEach((input) => {
        group[input.formControlName] = new UntypedFormControl(
          {
            value:
              input.type === 'select' && input?.defaultValue
                ? input.defaultValue
                : input.type === 'select' && !!input?.options
                ? input.options[0]
                : input.type === 'text' && input.defaultValue
                ? input.defaultValue
                : input.type === 'date' && input.defaultValue
                ? input.defaultValue
                : input.defaultValue === 0
                ? input.defaultValue.toString()
                : null,
            disabled: false,
          },
          input.validators
        );
      });


      if (this.modal?.fieldsets[1]) {
        modal?.fieldsets[1].inputs.forEach((input) => {
          group[input.formControlName] = new UntypedFormControl(
            {
              value:
                input.type === 'select' && input?.defaultValue
                  ? input.defaultValue
                  : input.type === 'select' && !!input?.options
                  ? input.options[0]
                  : input.type === 'text' && input.defaultValue
                  ? input.defaultValue
                  : input.type === 'date' && input.defaultValue
                  ? input.defaultValue
                  : input.defaultValue === 0
                  ? input.defaultValue.toString()
                  : null,
              disabled: false,
            },
            input.validators
          );
        });
      }
      
      this.form = this.fb.group(group);

      this.formSub = this.form.valueChanges.subscribe((changes) => {
        if (modal?.title === 'Transactions') {
          if (changes.transactionType !== this.currentTransactionType) {
            this.currentTransactionType = changes.transactionType;

            const transactionChangeFunction = modal.fieldsets[0].inputs.find(
              (input) => input.formControlName === 'transactionType'
            )?.onInputChange;

            if (transactionChangeFunction) {
              transactionChangeFunction(changes.transactionType);
            }
          }
        }

        if (modal?.title === 'Add Account') {
          const lowerCasedAcct = changes.acctType.toLowerCase();
          if (lowerCasedAcct !== this.currentAccountType) {
            this.currentAccountType = lowerCasedAcct;

            const accountChangeFunction = modal.fieldsets[0].inputs.find(
              (input) => input.formControlName === 'acctType'
            )?.onInputChange;

            if (accountChangeFunction) {
              accountChangeFunction(lowerCasedAcct);
            }
          }
        }
      });

      this.subs.add(this.formSub);
    });
    this.subs.add(modalSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  closeModal() {
    this.modalService.closeModal();
  }

  onSubmit() {
    const payload = this.modal?.contentList.length
      ? this.modal.contentList.categories
      : this.form.value;

    this.submitFn(payload);
  }
}
