import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';


describe('AuthService', () => {
  let service: AuthService;
  let store: MockStore;
  const initialState = {user: null};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [provideMockStore({initialState})]
    });
    service = TestBed.inject(AuthService);
    store = TestBed.inject(MockStore);    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
