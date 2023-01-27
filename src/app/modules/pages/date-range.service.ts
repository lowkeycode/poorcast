import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateRangeService {
  private openState$ = new BehaviorSubject<boolean>(false);
  isOpen$ = this.openState$.asObservable();
  private isOpen = false;

  toggleDateRange() {
    console.log('this.isOpen', this.isOpen);
    this.openState$.next(!this.isOpen);
    this.isOpen = !this.isOpen;
  }

}
