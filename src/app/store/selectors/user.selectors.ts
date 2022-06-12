import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '..';
export const selectAppState = createFeatureSelector<AppState>('user');

export const selectUser = createSelector(
    selectAppState,
    (appState) => {
        return appState?.user;
    }
)
