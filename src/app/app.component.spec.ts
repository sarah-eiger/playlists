import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { HeaderComponent } from './modules/core/components/header/header.component';
import { FooterComponent } from './modules/core/components/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AuthApiService } from './api/auth-api.service';
import { users } from './api/mock-database';
import { of } from 'rxjs';


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let store: MockStore;
  let authAPIService: AuthApiService;
  const initialState = {user: null};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ provideMockStore({initialState}), AuthApiService ],
      imports: [
        RouterTestingModule, HttpClientTestingModule, MatToolbarModule, MatIconModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore); 
    authAPIService = TestBed.inject(AuthApiService);    
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should store a user if ID exists in localStorage', () => {
    store.setState({user: null});
    spyOn(authAPIService, 'getUser').and.returnValue(of(users[0]));
    localStorage.setItem('currentUserId', '3');
    app.ngOnInit();
    expect(authAPIService['getUser']).toHaveBeenCalled();
    localStorage.clear();
  });

  it('should return the correct data when we prepare route', () => {
    spyOn(app, 'prepareRoute').and.callThrough();
    const prepareRouteResult = app.prepareRoute({ activatedRouteData: 'testRouteData' } as any);
    expect(prepareRouteResult).toEqual('testRouteData' as any)
  });

});
