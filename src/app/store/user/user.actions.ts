import { createAction, props } from '@ngrx/store';
import firebase from 'firebase/compat/app';

export const signInUser = createAction(
  '[ Sign In Page ] Sign In',
  props<firebase.User>()
);

export const signOutUser = createAction(
  '[ Global ] Sign Out'
);

