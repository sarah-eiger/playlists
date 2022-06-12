import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/modules/login/models/login-models';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public user$: Observable<User | null> = new Observable();

  constructor(private store: Store) { 
    this.user$ = this.store.select(selectUser);
  }
  
  ngOnInit(): void { }

}
