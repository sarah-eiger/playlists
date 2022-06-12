import { Injectable } from '@angular/core';
import { map, Observable, Subject, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/login-models';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthApiService } from 'src/app/api/auth-api.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { setUser, removeUser } from '../../../store/actions/user.actions';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private cookieService: CookieService, private authApiService: AuthApiService, private router: Router, private store: Store<any>) { }


  login(username: string, password: string): Observable<any> {
    //encode data using Base64 before sending to BE to ensure its transferred correctly
    const encodedUsername = btoa(username);
    const encodedPassword = btoa(password);

    return this.authApiService.authenticate(encodedUsername, encodedPassword).pipe(take(1), map(user => {
      localStorage.clear();
      if (user.token) this.setAuthCookie(user.token);
      this.store.dispatch(setUser({ user }));
      console.log('user from login', user);
      return user;
    }));

  }

  /**
 * Remove user from localstorage and cookie when logging out
 */
  logout(): void {
    this.cookieService.delete('auth-token')
    this.router.navigate(['home'])
    this.store.dispatch(removeUser())
  }

  /**
   * Sets login cookie data
   * @param {string} token - the name of the cookie you are setting
   */
  setAuthCookie(token: string): void {
    this.cookieService.set('auth-token', token, 1 / 24);
  }

  /**
   * Gets login cookie data
   * @returns {string} - our auth-token cookie value
   */
  getAuthCookie(): string {
    return this.cookieService.get('auth-token')
  }

  /**
 * Return stored user details from local storage
 * @returns {string} - either our currentUser details; or an empty string if there is none
 */
  getUserLocalStorage(): string {
    return localStorage.getItem('currentUserId') ? localStorage.getItem('currentUserId') as string : '';
  }


}
