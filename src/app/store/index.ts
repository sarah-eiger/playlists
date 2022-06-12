import { User } from "../modules/login/models/login-models";

export interface AppState {
    user: User | null
}