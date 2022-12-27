import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalConfig } from 'src/app/models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modal = new Subject<ModalConfig | null>();
  modalState$ = this.modal.asObservable();

  constructor() {}

  openModal(modalConfig: ModalConfig) {
    this.modal.next(modalConfig);
  }
}
