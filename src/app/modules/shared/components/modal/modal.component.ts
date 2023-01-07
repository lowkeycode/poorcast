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
    this.modal$ = this.modalService.modalState$
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
