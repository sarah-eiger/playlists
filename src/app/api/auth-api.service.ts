import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../modules/login/models/login-models';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Authenticates a user on login
   * @param {string} username - given username
   * @param {string} password - given password
   * @returns {Observable<User>}
   */
  public authenticate(username: string, password: string): Observable<User> {
    return this.httpClient.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
  };

  /**
   * Gets a user based on the userId
   * @param {number} userId - the user ID
   * @returns {Observable<User>}
   */
  public getUser(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}/users/getUser`,
      {
        params: new HttpParams().set('userId', userId)
      }
  )};

}
