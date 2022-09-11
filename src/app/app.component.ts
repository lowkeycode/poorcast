import { ErrorService } from './modules/shared/services/error.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss',]
})
export class AppComponent implements OnInit, OnDestroy {
  error: Error | null;
  subs = new Subscription();

  constructor(private errorService: ErrorService) {

  }

  ngOnInit() {
    const sub = this.errorService.errorState$.subscribe(error => {
      this.error = error;
    })
    this.subs.add(sub);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
