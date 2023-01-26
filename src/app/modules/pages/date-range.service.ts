import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateRangeService implements OnDestroy {
  private openState$ = new BehaviorSubject<boolean>(false);
  isOpen$ = this.openState$.asObservable();

  private _subs = new Subscription();

  toggleDateRange() {
    const isOpenSub = this.isOpen$.subscribe((isOpen) => {
      this.openState$.next(!isOpen);
    })

    this._subs.add(isOpenSub);
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}
