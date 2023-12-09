import { createAction, props } from '@ngrx/store';
import firebase from 'firebase/compat/app';

export const createCurrentUser = createAction(
  '[ Login Page ] Login',
  props<firebase.User>()
);

