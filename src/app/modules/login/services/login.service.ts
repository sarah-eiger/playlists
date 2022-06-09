import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/login-models';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(username: string, password: string): Observable<User> {
    //encode data using Base64 before sending to BE to ensure its transferred correctly
    const encodedUsername = btoa(username);
    const encodedPassword = btoa(password);
    return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { encodedUsername, encodedPassword })
      .pipe(take(1), map(user => {
        localStorage.clear();
        user = user[0];
        this.setAuthCookie(user.token);
        this.setUserLocalStorage(user);
        // this.currentUserSubject.next(user);
        return user;
      }));
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
 * After logging in, we store some user details in our localstorage for easy retrieval
 * @param {User} user - the user whose details we want to store
 */
  setUserLocalStorage(user: User): void {
    const userToStore = (({ firstName, lastName, token, id }) => ({ firstName, lastName, token, id }))(user);
    localStorage.setItem('currentUser', JSON.stringify(userToStore));
  }


}