import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Data, RouterOutlet } from '@angular/router';
import { LoadingService } from './modules/core/services/loading.service';
import { Store } from '@ngrx/store';
import { setUser } from './store/actions/user.actions';
import { AuthApiService } from './api/auth-api.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition('* => *', [
          style({ opacity: 0 }),
          animate(1000, style({ opacity: 1 }))
      ]),
  ])]
})

export class AppComponent implements OnInit {

  constructor(public loadingService: LoadingService, private store: Store, private authApiService: AuthApiService) {
   }

   /**
    * OnInit, we see if there is a currentUserId in our localStorage
    * If there is, we get the user, and send this user to our store so we can access the account
    */
  ngOnInit() {
    if (localStorage.getItem('currentUserId')) {
      const userId = parseInt(localStorage.getItem('currentUserId') as string);
      this.authApiService.getUser(userId).pipe(take(1)).subscribe(user => {
        this.store.dispatch(setUser({user}));
      })
    }

  }

  /**
   * Sets up our animations for route changes
   * @param {RouterOutlet} outlet - a placeholder that Angular dynamically fills based on the current router state
   * @returns {Data} - static data associated with a particular route
   */
  public prepareRoute(outlet: RouterOutlet): Data {
    return outlet && outlet?.activatedRouteData;
  }

}
