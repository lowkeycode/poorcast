import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Injectable } from '@angular/core';
import { catchError, from, tap, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userState$ = new BehaviorSubject<any>({});
  user = this.userState$.asObservable();
  loggedInState$ = new Subject<boolean>();
  loggedIn = this.loggedInState$.asObservable();

  constructor(private afAuth : AngularFireAuth) { }

  signInEmailPass(email: string, password: string) {
    
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      tap(user => {
        this.userState$.next(user);
        this.loggedInState$.next(!!user);
      }),
      catchError(err => {
        throw 'Issue Signing In: ' + err;
      })
    );
  }

  signInGoogle() {
    return from(this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(user => {
      
      if(user) {
        console.log(user.user);

        this.userState$.next(user);
      }
      
      this.loggedInState$.next(!!user);
    })).pipe(
      catchError(err => {
        throw 'Issue Signing Into Google: ' + err;
      })
    )
  }

  signUp(email: string, password: string) {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      tap(user => {
        this.userState$.next(user);
        this.loggedInState$.next(!!user);
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
