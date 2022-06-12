import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { User } from '../../login/models/login-models';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthApiService } from 'src/app/api/auth-api.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setUser, removeUser } from '../../../store/actions/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService, private authApiService: AuthApiService, private router: Router, private store: Store<any>) { }

  /**
   * Our login function authenticates our user
   * It encodes data using Base64 before sending to the backend to ensure its transferred correctly and securely
   * If we find a user, we dispatch the user to the store and create an auth cookie
   * Else, error will be displayed in the login div
   * @param {string} username
   * @param {string} password 
   * @returns {Observable<User>}
   */
  public login(username: string, password: string): Observable<User> {
    const encodedUsername = btoa(username);
    const encodedPassword = btoa(password);

    return this.authApiService.authenticate(encodedUsername, encodedPassword).pipe(take(1), map(user => {
      localStorage.clear();
      if (user.token) this.cookieService.set('auth-token', user.token, 1 / 24);;
      this.store.dispatch(setUser({ user }));
      return user;
    }));

  }

  /**
   * Remove user from localStorage and our store, and remove cookie, when logging out
   */
  public logout(): void {
    this.cookieService.delete('auth-token')
    this.router.navigate(['home'])
    this.store.dispatch(removeUser())
  }

  /**
   * Gets login cookie data
   * @returns {string} - our auth-token cookie value
   */
  public getAuthCookie(): string {
    return this.cookieService.get('auth-token')
  }

}
