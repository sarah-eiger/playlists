import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { of, throwError } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { users } from '../../../api/mock-database'
import { AuthService } from '../../core/services/auth.service'
import { provideMockStore, MockStore } from '@ngrx/store/testing';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let store: MockStore;
  const initialState = {user: null};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [provideMockStore({initialState}), AuthService],
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule, NoopAnimationsModule, MatFormFieldModule, MatIconModule, MatInputModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the password', () => {
    const currentShowValue = component.show;
    spyOn(component, 'togglePassword').and.callThrough();
    const toggleIcon = fixture.debugElement.query(By.css('#toggle-password'));
    toggleIcon.nativeElement.click();
    fixture.detectChanges();
    expect(component['togglePassword']).toHaveBeenCalled;
    expect(component['show']).toEqual(!currentShowValue);
  });

  it('should log in the user', () => {
    expect(authService).toBeTruthy();
    spyOn(authService, 'login').and.returnValue(of(users[0]));

    component.loginForm.controls['username'].markAsDirty();
    component.loginForm.controls['username'].setValue(users[0].username);
    fixture.detectChanges();

    component.loginForm.controls['password'].markAsDirty();
    component.loginForm.controls['password'].setValue(users[0].password);
    component.loginForm.markAllAsTouched();
    fixture.detectChanges();

    spyOn(component, 'onSubmit').and.callThrough();
    const loginButton = fixture.debugElement.query(By.css('#login-button'));
    loginButton.nativeElement.click();
    fixture.detectChanges();
    expect(component['onSubmit']).toHaveBeenCalled();
  })

  it('should NOT log in the user', () => {
    expect(authService).toBeTruthy();
    spyOn(authService, 'login').and.returnValue(throwError(() => new Error('error')));
    fixture.detectChanges();

    component.loginForm.controls['username'].markAsDirty();
    component.loginForm.controls['username'].setValue('1234');
    fixture.detectChanges();

    component.loginForm.controls['password'].markAsDirty();
    component.loginForm.controls['password'].setValue('1234');
    component.loginForm.markAllAsTouched();
    fixture.detectChanges();

    spyOn(component, 'onSubmit').and.callThrough();
    const loginButton = fixture.debugElement.query(By.css('#login-button'));
    loginButton.nativeElement.click();
    fixture.detectChanges();
    expect(component['onSubmit']).toHaveBeenCalled();
    expect(component['authError']).toBeTruthy;
  })

  it('should not call authenticate if there is no form value', () => {
    component.loginForm.controls['username'].markAsPristine();
    component.loginForm.controls['username'].setValue('');
    fixture.detectChanges();

    component.loginForm.controls['password'].markAsPristine();
    component.loginForm.controls['password'].setValue('');
    fixture.detectChanges();

    spyOn(authService, 'login').and.callThrough();
    component.onSubmit();
    expect(authService['login']).not.toHaveBeenCalled();
  })

});
