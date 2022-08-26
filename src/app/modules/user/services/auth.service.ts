import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Injectable } from '@angular/core';
import { catchError, from, tap, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  state$ = new Subject<boolean>();
  signedIn = this.state$.asObservable();

  constructor(private afAuth : AngularFireAuth) { }

  signInEmailPass(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      tap(user => {
        this.state$.next(!!user)
      }),
      catchError(err => {
        throw 'Issue Signing In: ' + err;
      })
    );
  }

  signInGoogle() {
    return from(this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res => {
      this.state$.next(!!res);
    })).pipe(
      catchError(err => {
        throw 'Issue Signing Into Google: ' + err;
      })
    )
  }

  signUp(email: string, password: string) {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      tap(user => {
        this.state$.next(!!user)
      }),
      catchError(err => {
        throw 'Issue Creating User: ' + err;
      })
    );
  }

  resetPass(email: string) {
    return from(firebase.auth().sendPasswordResetEmail(email).then()).pipe(
      tap(_ => {
        console.log('Password Reset Sent.');
        
      }),
      catchError(err => {
        throw 'Issue Resetting Password: ' + err;
      })
    )
  }
}
