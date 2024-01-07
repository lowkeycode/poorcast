import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducers'; 

const selectUser = createFeatureSelector<UserState>('user');

export const selectUserId = createSelector(selectUser, (state) => {
  console.log('state', state);

  return state.user?.uid;
});
