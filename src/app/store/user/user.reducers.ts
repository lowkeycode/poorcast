import { createReducer, on } from "@ngrx/store";
import * as UserActions from './user.actions';
import { AppState } from "src/app/app.module";

const initialState = {} as AppState;


export const userReducer = createReducer(
  initialState,
  on(UserActions.createCurrentUser, (state, user) => {
    return {...state, user};
  }),

)