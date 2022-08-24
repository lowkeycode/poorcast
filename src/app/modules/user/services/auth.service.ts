import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { catchError, from, tap, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  state$ = new Subject<boolean>();
  signedIn = this.state$.asObservable();

  constructor(private afAuth : AngularFireAuth) { }

  signIn(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      tap(user => {
        this.state$.next(!!user)
      }),
      catchError(err => {
        throw 'Issue Creating User: ' + err;
      })
    );
  }
}
