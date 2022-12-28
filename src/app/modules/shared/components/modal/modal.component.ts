import { ModalService } from './../../services/modal.service';
import { Component, OnInit } from '@angular/core';
import { ModalConfig } from 'src/app/models/interfaces';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  modal$: Observable<ModalConfig | null>;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    // this.modal$ = this.modalService.modalState$

    const init = {
      title: 'Add Account',
      fieldsetNames: ['Account'],
      modalButtons: [
        { buttonName: 'Save', clickFn: () => console.log('Saving') },
      ],
      modalInputs: [
        {
          formControlName: 'acctName',
          label: 'Account Name',
          type: 'text',
          hidden: false,
        },
        {
          formControlName: 'acctType',
          label: 'Account Type',
          type: 'text',
          hidden: false,
        },
        {
          formControlName: 'acctName',
          label: 'Account Name',
          type: 'text',
          hidden: true,
        },
      ],
    } as ModalConfig;

    // todo Review the Control Value Accessor & Reactive Forms
    // todo Create custom select component that implements the CVA
    // todo Use a ul with li along with *ngFor and [ngSwitch]*-


    this.modal$ = of(init);
  }

  // formControlName="email"
  // [controlName]="email"
  // [label]="'Email'"
  // [type]="'email'"
  // [valid]="email?.valid && email?.dirty"
  // [invalid]="!email?.valid && email?.dirty"
  // [feedBackMsg]="feedbacks['email']"
  // [showFeedback]="email?.invalid && email?.dirty"
}
