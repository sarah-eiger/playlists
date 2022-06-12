import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/modules/login/models/login-models';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public user$: Observable<User | null> = new Observable();

  constructor(public router: Router, private authService: AuthService, private store: Store) { 
    this.user$ = this.store.select(selectUser); //get users from store to display on the template
  }

  public logout() {
    this.authService.logout()
  }
}