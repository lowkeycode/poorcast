import { createReducer, on } from '@ngrx/store';
import firebase from 'firebase/compat/app';
import * as UserActions from './user.actions';

export interface UserState {
  user: firebase.User;
}

const initialState = {} as UserState;

export const userReducer = createReducer(
  initialState,
  on(UserActions.signInUser, (state, user) => {
    return { ...state, user };
  }),

  on(UserActions.signOutUser, (state) => initialState)
);
