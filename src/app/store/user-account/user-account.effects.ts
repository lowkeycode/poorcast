import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserAccountActions from './user-account.actions';
import { catchError, combineLatest, distinctUntilChanged, first, from, map, of, switchMap } from 'rxjs';
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

        // ! This is a fucking shit show. Clean this up.

        console.log(response);

        
        const [accounts, budgetPeriods, expenses, categories] = response;

        // Need to do determine unique categories for category management on client side because we don't have an API to interact with our DB
        const existingExpenseCategories = expenses.map(
          (expense) => expense['category']
        ) as string[];
        const existingCategories = categories[0]['categories'] as string[];

        let allUniqueCategories: string[] = [];
        if(existingCategories.length) {
          allUniqueCategories = Array.from(
            new Set([...existingExpenseCategories, ...existingCategories].map(category => category.toLowerCase()))
          ) as string[];
        }

        let budgetPeriodKeys = [] as string[];

        if(budgetPeriods[0]) {
          budgetPeriodKeys = Object.keys(cloneDeep(budgetPeriods[0]));
        }

        console.log('categories', categories);
        
        let categoryId = '';
        if(categories[0]['id']) {
          categoryId = categories[0]['id'];
        }

        const userAccount = {
          accounts,
          budgetPeriods: budgetPeriods[0] || {},
          budgetPeriodKeys,
          expenses,
          categories: { categories: allUniqueCategories, id: categoryId },
          status: 'success',
          error: null,
        };

        console.log(userAccount);
        

        return UserAccountActions.loadUserAccountSuccess(
          userAccount as UserAccount
        );
      })
    )
  );
}
