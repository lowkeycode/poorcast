import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { catchError, from, tap, BehaviorSubject, timer, finalize } from 'rxjs';
import { ErrorService } from '../../shared/services/error.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/store/user/user.reducers';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { createCurrentUser } from 'src/app/store/user/user.actions';
import { loadUserAccount } from 'src/app/store/user-account/user-account.actions';
import { selectUserId } from './../../../store/user/user.selectors';
import { selectUserAccount } from 'src/app/store/user-account/user-account.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userState$ = new BehaviorSubject<firebase.auth.UserCredential | null>(
    null
  );
  user = this.userState$.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private errorService: ErrorService,
    private router: Router,
    private store: Store<UserState>,
    private afs: AngularFirestore
  ) {}

  signInEmailPass(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      tap((user) => {
        console.log('user', user);
        const dispatchUser = JSON.parse(JSON.stringify(user.user));
        this.store.dispatch(createCurrentUser(dispatchUser));

        this.store.select(selectUserId).subscribe((id) => {
          //! get user data

          //! if none create
          this.userState$.next(user);
        });
      }),
      catchError((err) => {
        this.errorService.onError(err);
        throw 'Issue Signing In: ' + err;
      })
    );
  }

  signInGoogle() {
    return from(
      this.afAuth.signInWithPopup(new GoogleAuthProvider()).then((user) => {
        console.log('user', user);

        const dispatchUser = JSON.parse(JSON.stringify(user.user));
        this.store.dispatch(createCurrentUser(dispatchUser));

        this.store.dispatch(loadUserAccount())

        this.store.select(selectUserAccount).subscribe(() => this.userState$.next(user))
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
        const dispatchUser = JSON.parse(JSON.stringify(user.user));
        this.store.dispatch(createCurrentUser(dispatchUser));
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
      this.router.navigate(['/']);
    });
  }

  deleteAccount() {
    timer(2500).subscribe(() => {
      this.afAuth.currentUser.then((user) => {
        this.store.select(selectUserId).subscribe((id) => {
          user?.delete();

          //! Remove user data from firebase

          this.signOut();
        });
      });
    });
  }
}
