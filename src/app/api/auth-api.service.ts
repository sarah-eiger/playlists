import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../modules/login/models/login-models';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private httpClient: HttpClient) { }

  public authenticate(username: string, password: string): Observable<User> {
    return this.httpClient.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
}

}
