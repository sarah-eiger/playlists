import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import {AuthService} from '../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class CanLoadGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  /**
   * We use the CanLoad route guard for the 'Account' route
   * It prevents initial load, saving memory
   * We check if we have an auth-token in our cookies (it expires after 1 hour)
   * If the auth-token has expired, or a user is not logged in, we cannot go to the 'Account' page and we reroute to 'Login'
   * @returns {boolean}
   */
  canLoad(): boolean {
    const authToken = this.authService.getAuthCookie();
    if (!!authToken) {
      return true;
    } else {
      this.authService.logout();
      this.router.navigate(['login']);
      return false;
    }
  }
}
