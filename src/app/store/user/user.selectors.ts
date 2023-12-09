import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.module";
import firebase from 'firebase/compat/app';

// export const selectUser = createFeatureSelector<firebase.auth.UserCredential | null>('user');

// export const selectUserId = createSelector(
//   selectUser,
//   (userCred: firebase.auth.UserCredential | null) => userCred?.user?.uid
// )

// export const selectUser = (appState: AppState) => appState.user;

// export const selectUserId = createSelector(
//   selectUser,
//   (userCred: string) => {
//     console.log('userCred', userCred);
    
//     return userCred.length
//   }
// )

const selectUser = createFeatureSelector<AppState>('user');

export const selectUserId = createSelector(selectUser, (state) => {
  console.log('state', state);
  
  return state.user?.uid;
});