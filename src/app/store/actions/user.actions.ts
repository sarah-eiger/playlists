import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/modules/login/models/login-models';

export const setUser = createAction(
    '[User Component] SetUser',
    props<{ user: User }>()
);

export const removeUser = createAction(
    '[User Component] RemoveUser'
);