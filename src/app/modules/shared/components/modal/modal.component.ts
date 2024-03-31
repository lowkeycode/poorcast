import { ModalService } from './../../services/modal.service';
import {
  Component,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ViewChildren,
  QueryList,
  OnChanges,
  SimpleChanges,
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
import { Store } from '@ngrx/store';
import { UserAccount } from 'src/app/store/user-account/user-account.reducers';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @ViewChildren(TextInputComponent)
  genericInputs: QueryList<TextInputComponent>;
  @ViewChildren(SelectInputComponent)
  selectInputs: QueryList<SelectInputComponent>;
  modal$: Observable<ModalConfig | null>;
  form!: UntypedFormGroup;
  contentList: string[];
  private modal: ModalConfig | null;
  private submitFn: PayloadFunction;
  private subs = new Subscription();

  constructor(
    private modalService: ModalService,
    private fb: UntypedFormBuilder,
    private store: Store<UserAccount>,
  ) {}

  ngOnInit(): void {
    this.modal$ = this.modalService.modalState$;
    const modalSub = this.modal$.subscribe((modal) => {
      this.modal = modal;
      this.contentList = this.modal?.contentList.categories;
      
      this.submitFn = this.modal?.modalButtons.find(
        (button) => button.type === 'primary'
      )?.submitFn as PayloadFunction;

      const group = {} as UntypedFormGroup;

      //! This might bite me when it comes to two fieldsets

      modal?.fieldsets[0].inputs.forEach((input) => {

        group[input.formControlName] = new UntypedFormControl(
          {
            value:
              input.type === 'select' && !!input?.options
                ? input.options[0] || input.defaultValue
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
      this.form = this.fb.group(group);
    });
    this.subs.add(modalSub);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    console.log(this.form.value);
    
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngAfterViewInit() {
    // console.log('this.genericInputs', this.genericInputs);
    // console.log('this.selects', this.selectInputs);
  }

  closeModal() {
    this.modalService.closeModal();
  }

  onSubmit() {
    const payload = this.modal?.contentList.length ? this.modal.contentList.categories : this.form.value;
    this.submitFn(payload);
  }
}
