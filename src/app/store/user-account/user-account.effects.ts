import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserAccountActions from './user-account.actions';
import { catchError, combineLatest, distinctUntilChanged, first, from, map, of, switchMap } from 'rxjs';
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
      switchMap((userId) =>
        this.afs
          .collection('users')
          .doc(userId)
          .collection('categories')
          .valueChanges({ idField: 'id' })
      ),
      switchMap((categories) => {
        if (!categories.length) {
          return this.store.select(selectUserId).pipe(
            switchMap((userId) => {
              return this.afs
                .collection('users')
                .doc(userId)
                .collection('categories')
                .add({ categories: [] });
            })
          );
        }
        return of(null);
      }),
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

        // Need to do determine unique categories for category management on client side because we don't have an API to interact with our DB
        const existingExpenseCategories = expenses.map(
          (expense) => expense['category']
        );
        const existingCategories = categories[0]['categories'];

        const allUniqueCategories = Array.from(
          new Set([...existingExpenseCategories, ...existingCategories].map(category => category.toLowerCase()))
        );


        const userAccount = {
          accounts,
          budgetPeriods: budgetPeriods[0],
          expenses,
          categories: { categories: allUniqueCategories },
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
