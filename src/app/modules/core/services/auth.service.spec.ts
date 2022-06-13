import { fakeAsync, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AuthApiService } from 'src/app/api/auth-api.service';
import { users } from 'src/app/api/mock-database';
import { map, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


describe('AuthService', () => {
  let service: AuthService;
  let store: MockStore;
  let apiService: AuthApiService;
  let cookieService: CookieService;
  const initialState = {user: null};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [provideMockStore({initialState}), AuthApiService]
    });
    cookieService = TestBed.inject(CookieService)
    service = TestBed.inject(AuthService);
    store = TestBed.inject(MockStore);
    apiService = TestBed.inject(AuthApiService);    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user data', fakeAsync(() => {
    spyOn(apiService, 'authenticate').and.returnValue(of(users[0]));
    service.login(users[0].username, users[0].password).pipe(map(user => ({...user, token: 'auth-token'}))).subscribe(user => {
      expect(apiService['authenticate']).toHaveBeenCalledWith('dGVzdA==', 'dGVzdA==');
      expect(user).toEqual(user); 
    });
  }));

});
