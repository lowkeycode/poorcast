import { ModalService } from './modules/shared/services/modal.service';
import { ErrorService } from './modules/shared/services/error.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { ModalConfig } from './models/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  error: Error | null;
  modal: ModalConfig | null;
  subs = new Subscription();

  constructor(
    private errorService: ErrorService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    const sub = combineLatest([this.errorService.errorState$, this.modalService.modalState$]).subscribe(([error, modal]) => {
      this.error = error;
      this.modal = modal;
    });

    this.subs.add(sub);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
