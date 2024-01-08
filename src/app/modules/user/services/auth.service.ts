import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import {
  catchError,
  from,
  tap,
  BehaviorSubject,
  timer,
  of,
  shareReplay,
} from 'rxjs';
import { ErrorService } from '../../shared/services/error.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userState$ = new BehaviorSubject<firebase.auth.UserCredential | null>(null);
  user = this.userState$.asObservable().pipe(shareReplay());

  constructor(
    private afAuth: AngularFireAuth,
    private errorService: ErrorService,
    private router: Router
  ) {}

  signInEmailPass(email: string, password: string) {
    console.log(email);
    
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      tap((user) => {
        console.log('user', user);
        this.userState$.next(user);
      }),
      catchError((err) => {
        this.errorService.onError(err);
        throw 'Issue Signing In: ' + err;
      })
    );
  }

  signInGoogle() {
    console.log(firebase)
  
    return from(
      this.afAuth
        .signInWithPopup(new GoogleAuthProvider())
        .then((user) => {
          this.userState$.next(user);
          localStorage.setItem('user', JSON.stringify(user));
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
      }),
      catchError((err: Error) => {
        this.errorService.onError(err);
        throw 'Issue Creating User: ' + err;
      })
    );
  }

  resetPass(email: string) {
    return from(this.afAuth.sendPasswordResetEmail(email).then()).pipe(
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
    this.afAuth.signOut().then(() => {
      this.userState$.next(null);
      this.autoLogout();
      this.router.navigate(['/'])
    });
  }

  deleteAccount() {
    timer(2500).subscribe(() => {
      this.afAuth.currentUser.then((user) => {
        user?.delete();
        this.signOut();
      });
    });
  }

  autoLogin() {
    const user = localStorage.getItem('user');
    if(!!user) {
      return JSON.parse(user) as firebase.auth.UserCredential ;
    } else {
      return null;
    }
  }

  autoLogout() {
    localStorage.clear();
  }
}
