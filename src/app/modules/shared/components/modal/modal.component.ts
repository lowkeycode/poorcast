import { ModalService } from './../../services/modal.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ModalConfig } from 'src/app/models/interfaces';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  modal$: Observable<ModalConfig | null>;
  form!: UntypedFormGroup;
  private subs = new Subscription();

  constructor(private modalService: ModalService, private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.modal$ = this.modalService.modalState$;
    const modalSub = this.modal$.subscribe(modal => {
      console.log('modal', modal)
    });
    this.subs.add(modalSub);

    this.form = this.fb.group({})
    
  }

  ngOnDestroy(): void {
      this.subs.unsubscribe();
  }

  closeModal() {
    this.modalService.closeModal();
  }

  onSubmit() {
    console.log('submit')
  }
}
