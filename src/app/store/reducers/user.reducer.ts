import { createReducer, on } from '@ngrx/store';
import { setUser, removeUser } from '../actions/user.actions';
import { AppState } from '..';

export const initialState: AppState = {
    user: null,
}

export const userReducer = createReducer(
    initialState,
    on(setUser, (state, { user }) => {
        localStorage.setItem('currentUserId', JSON.stringify(user.id));
        return ({ ...state, user: user })
    }),
    on(removeUser, (state) => {
        localStorage.clear();
        return ({ ...state, user: null })
    }),
);