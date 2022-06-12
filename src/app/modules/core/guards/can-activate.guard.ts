import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  /**
   * We use the CanActivate route guard for the 'Account' route
   * We check if we have an auth-token in our cookies (it expires after 1 hour)
   * If the auth-token has expired, or a user is not logged in, we cannot go to the 'Account' page and we reroute to 'Login'
   * @returns {boolean}
   */
  canActivate(): boolean {
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
