import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ModalConfig } from 'src/app/models/interfaces';


@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modal = new ReplaySubject<ModalConfig | null>(1);
  modalState$ = this.modal.asObservable();

  constructor() {}

  openModal(modalConfig: ModalConfig) {
    this.modal.next(modalConfig);
  }

  closeModal() {
    this.modal.next(null);
  }
}
