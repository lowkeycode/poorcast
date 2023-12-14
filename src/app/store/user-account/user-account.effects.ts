import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserAccountActions from './user-account.actions';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUserId } from '../user/user.selectors';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserAccount } from './user-account.reducers';

@Injectable()
export class UserAccountEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private afs: AngularFirestore
  ) {}

  loadUserAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAccountActions.loadUserAccount),
      switchMap(() => {
        console.log('Yup')
        return this.store.select(selectUserId)
      }),
      switchMap((userId) =>
        {
          console.log('Sure')
          return this.afs.collection('users').doc(userId).valueChanges()
        }
      ),
      map((userAccount) => {
        console.log('userAccount', userAccount);
         return UserAccountActions.loadUserAccountSuccess(userAccount as UserAccount)
      }),
      catchError((error) =>
        of(
            UserAccountActions.loadUserAccountError({ error })
        )
      )
    )
  );
}
