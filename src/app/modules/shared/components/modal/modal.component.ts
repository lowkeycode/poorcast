import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor() {}

  modal = new Subject<ModalConfig>();
  modalState$ = this.modal.asObservable();

  ngOnInit(): void {}
}
