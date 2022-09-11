import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  error = new Subject<Error | null>();
  errorState$ = this.error.asObservable();
  message = '';

  onError(err: Error) {
    this.error.next(err);
  }

  onReset() {
    this.error.next(null);
  }

}
