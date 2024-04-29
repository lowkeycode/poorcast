import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserAccountActions from './user-account.actions';
import { catchError, combineLatest, map, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUserId } from '../user/user.selectors';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserAccount } from './user-account.reducers';
import { cloneDeep } from 'lodash';

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
            .valueChanges({ idField: 'id' }),
          this.afs
            .collection('users')
            .doc(userId)
            .collection('budgetPeriods')
            .valueChanges(),
          this.afs
            .collection('users')
            .doc(userId)
            .collection('expenses')
            .valueChanges({ idField: 'id' }),
          this.afs
            .collection('users')
            .doc(userId)
            .collection('categories')
            .valueChanges({ idField: 'id' }),
        ]).pipe(
          catchError((error) => {
            console.error('error', error);

            return of(null);
          })
        );
      }),
      map((response) => {
        if (!response) {
          return UserAccountActions.loadUserAccountError(response);
        }

        const [accounts, budgetPeriods, expenses, categories] = response;

        console.log('response', response);
        

        let budgetPeriodKeys = [] as string[];

        if (budgetPeriods[0]) {
          budgetPeriodKeys = Object.keys(cloneDeep(budgetPeriods[0]));
        }

        const userAccount = {
          accounts,
          budgetPeriods: budgetPeriods[0] || {},
          budgetPeriodKeys,
          expenses,
          categories: categories[0] || { categories: [] },
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
