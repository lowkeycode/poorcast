import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Injectable } from '@angular/core';
import {
  catchError,
  from,
  tap,
  ReplaySubject,
  BehaviorSubject,
  timer,
} from 'rxjs';
import { ErrorService } from '../../shared/services/error.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userState$ = new BehaviorSubject<any>({});
  user = this.userState$.asObservable();
  loggedInState$ = new ReplaySubject<boolean>();
  loggedIn = this.loggedInState$.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private errorService: ErrorService,
    private router: Router,
  ) {}

  signInEmailPass(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      tap((user) => {
        this.userState$.next(user);
        this.loggedInState$.next(!!user);
      }),
      catchError((err) => {
        this.errorService.onError(err);
        throw 'Issue Signing In: ' + err;
      })
    );
  }

  signInGoogle() {
    return from(
      this.afAuth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((user) => {
          if (user) {
            this.userState$.next(user);
          }

          this.loggedInState$.next(!!user);
        })
    ).pipe(
      catchError((err: Error) => {
        err;
        this.errorService.onError(err);
        throw 'Issue Signing Into Google: ' + err;
      })
    );
  }

  signUp(email: string, password: string) {
    return from(
      this.afAuth.createUserWithEmailAndPassword(email, password)
    ).pipe(
      tap((user) => {
        this.userState$.next(user);
        this.loggedInState$.next(!!user);
      }),
      catchError((err: Error) => {
        this.errorService.onError(err);
        throw 'Issue Creating User: ' + err;
      })
    );
  }

  resetPass(email: string) {
    return from(firebase.auth().sendPasswordResetEmail(email).then()).pipe(
      tap((_) => {
        console.log('Password Reset Sent.');
      }),
      catchError((err: Error) => {
        this.errorService.onError(err);
        throw 'Issue Resetting Password: ' + err;
      })
    );
  }

  signOut() {
    this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  deleteAccount() {
    timer(2500).subscribe(() => {
      this.afAuth.currentUser.then((user) => {
        user?.delete();
        this.signOut();
      });
    });
  }
}
