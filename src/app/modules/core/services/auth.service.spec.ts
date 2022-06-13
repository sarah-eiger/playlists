import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AuthApiService } from 'src/app/api/auth-api.service';
import { users } from 'src/app/api/mock-database';


describe('AuthService', () => {
  let service: AuthService;
  let store: MockStore;
  let apiService: AuthApiService;
  const initialState = {user: null};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [provideMockStore({initialState}), AuthApiService]
    });
    service = TestBed.inject(AuthService);
    store = TestBed.inject(MockStore);
    apiService = TestBed.inject(AuthApiService);    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login a user', () => {
    spyOn(apiService, 'authenticate').and.callThrough();
    service.login(users[0].username, users[0].password);
    expect(apiService['authenticate']).toHaveBeenCalledWith('dGVzdA==', 'dGVzdA==');
  })
});
