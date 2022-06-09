export interface User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    // favourites: Array<number>;
    token?: string;
}