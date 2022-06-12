import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from './modules/core/services/loading.service';
import { Store } from '@ngrx/store';
import { setUser } from './store/actions/user.actions';
import { selectUser } from './store/selectors/user.selectors';
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

export class AppComponent {
  public loading: boolean = false;

  constructor(public loadingService: LoadingService, private store: Store, private authApiService: AuthApiService) {
   }

  ngOnInit() {
    if (localStorage.getItem('currentUserId')) {
      //TODO: get user from ID
      const userId = parseInt(localStorage.getItem('currentUserId') as string);
      this.authApiService.getUser(userId).pipe(take(1)).subscribe(user => {
        console.log('user', user);
        this.store.dispatch(setUser({user}));
      })
    }

  }

  public prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet?.activatedRouteData;
  }

}
