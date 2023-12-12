import { selectUserId } from './../../../store/user/user.selectors';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { catchError, from, tap, BehaviorSubject, timer, finalize } from 'rxjs';
import { ErrorService } from '../../shared/services/error.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/store/user/user.reducers';
import { createCurrentUser } from 'src/app/store/user/user.actions';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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

        // todo - create userData slice initially null
        // todo - action and effect for creating accounts
        // ? I think the actually filtering by date will possibly need to be done on the client side unless we can guarantee order on initial load

        this.store.select(selectUserId).subscribe((id) => {
          this.afs
            .collection('users')
            .doc(id)
            .valueChanges()
            .subscribe((data) => {
              console.log(typeof data);
            });
          this.afs
            .collection('users')
            .doc(id)
            .collection('accounts')
            .valueChanges()
            .subscribe((data) => {
              console.log(data);
            });

          this.userState$.next(user);
        });
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
