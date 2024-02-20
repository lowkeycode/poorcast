import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserAccountActions from './user-account.actions';
import { catchError, combineLatest, from, map, of, switchMap } from 'rxjs';
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
        return this.store.select(selectUserId);
      }),
      switchMap((userId) => {
        return combineLatest([
          this.afs
            .collection('users')
            .doc(userId)
            .collection('accounts')
            .valueChanges(),
          this.afs
            .collection('users')
            .doc(userId)
            .collection('budgetPeriods')
            .valueChanges(),
          this.afs
            .collection('users')
            .doc(userId)
            .collection('expenses')
            .valueChanges({idField: 'id'}),
          this.afs
            .collection('users')
            .doc(userId)
            .collection('categories')
            .valueChanges(),
        ]).pipe(
          catchError((error) => {
            console.error('error', error);

            return of(null);
          })
        );
      }),
      map((response) => {
        if(!response) {
          return UserAccountActions.loadUserAccountError(response);
        }

        const [accounts, budgetPeriods, expenses, categories] = response;

        const userAccount = {
          accounts,
          budgetPeriods: budgetPeriods[0],
          expenses,
          categories,
          status: 'success',
          error: null,
        };

        return UserAccountActions.loadUserAccountSuccess(
          userAccount as UserAccount
        );
      })
    )
  );
}
