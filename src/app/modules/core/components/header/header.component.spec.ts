import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from './header.component';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import {users} from '../../../../api/mock-database';
import { provideMockStore, MockStore } from '@ngrx/store/testing';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore;
  const initialState = {user: null};


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [provideMockStore({initialState})],
      imports: [RouterTestingModule, HttpClientTestingModule, MatIconModule, MatToolbarModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);    
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.user$ = of(null);
    fixture.detectChanges();
  });

  it('should create the header component', () => {
    expect(component).toBeTruthy();
    const logoutButton = fixture.debugElement.query(By.css('#logout-button'));
    expect(logoutButton).toBeFalsy();
  });

  it('should display the logout button if there is a logged in user', () => {
    component.user$ = of(users[0]);
    fixture.detectChanges();
    const logoutButton = fixture.debugElement.query(By.css('#logout-button'));
    expect(logoutButton).toBeTruthy();

    spyOn<any>(component, 'logout').and.callThrough();
    logoutButton.nativeElement.click();
    fixture.detectChanges();
    expect(component['logout']).toHaveBeenCalled();
    expect(logoutButton).toBeTruthy();
  });

});
