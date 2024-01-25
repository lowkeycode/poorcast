import { ModalService } from './../../services/modal.service';
import {
  Component,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { FieldsetInput, ModalConfig } from 'src/app/models/interfaces';
import { TextInputComponent } from '../forms/text-input/text-input.component';
import { SelectInputComponent } from '../forms/select-input/select-input.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren(TextInputComponent)
  genericInputs: QueryList<TextInputComponent>;
  @ViewChildren(SelectInputComponent)
  selectInputs: QueryList<SelectInputComponent>;
  modal$: Observable<ModalConfig | null>;
  form!: UntypedFormGroup;
  private subs = new Subscription();

  constructor(
    private modalService: ModalService,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.modal$ = this.modalService.modalState$;
    const modalSub = this.modal$.subscribe((modal) => {
      console.log('modal', modal);

      const group = {} as UntypedFormGroup;

      modal?.fieldsets[0].inputs.forEach(
        (input) =>
          (group[input.formControlName] = new UntypedFormControl(
            { value: null, disabled: false },
            Validators.required
          ))
      );
      this.form = this.fb.group(group);
    });
    this.subs.add(modalSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngAfterViewInit() {
    console.log('this.genericInputs', this.genericInputs);
    console.log('this.selects', this.selectInputs);
  }

  closeModal() {
    this.modalService.closeModal();
  }

  onSubmit() {
    console.log('this.form', this.form);
  }
}
