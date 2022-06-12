import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from '../../login/services/login.service'

@Injectable({
  providedIn: 'root'
})
export class CanLoadGuard implements CanLoad {

  constructor(private loginService: LoginService, private router: Router) { }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const authToken = this.loginService.getAuthCookie();
    if (!!authToken) {
      return true;
    } else {
      this.loginService.logout();
      this.router.navigate(['login']);
      return false;
    }
  }
  
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  
}
