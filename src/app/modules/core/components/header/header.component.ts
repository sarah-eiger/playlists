import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/modules/login/models/login-models';
import { LoginService } from 'src/app/modules/login/services/login.service';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user$: Observable<User | null> = new Observable();

  constructor(public router: Router, private loginService: LoginService, private store: Store) { 
    this.user$ = this.store.select(selectUser);
  }


  ngOnInit(): void {}

  logout() {
    this.loginService.logout()
  }
}