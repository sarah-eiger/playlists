import { fakeAsync, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { AuthApiService } from './auth-api.service';
import { users } from './mock-database';

describe('AuthApiService', () => {
  let service: AuthApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user data', () => {
    service.authenticate('dGVzdA==', 'dGVzdA==').subscribe(user => {
      expect(user).toContain(users[0])
    });

    const req = httpTestingController.expectOne('http://localhost:4000/users/authenticate');
    expect(req.request.method).toEqual('POST');
    req.flush(users);
  });

  it('should return user based on ID', fakeAsync(() => {
    service.getUser(1).subscribe(user => {
      expect(user).toContain(users[0])
    });

    const req = httpTestingController.expectOne('http://localhost:4000/users/getUser?userId=1');
    expect(req.request.method).toEqual('GET');
    req.flush(users);
  }));


});
