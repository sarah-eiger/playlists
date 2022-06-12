import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { take } from 'rxjs/operators';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})

export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public show: boolean = false;
  public loading: boolean = false;
  public authError: string = '';

  constructor(private router: Router, private fb: FormBuilder, private loginService: LoginService, public loadingService: LoadingService) { 
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  /**
   * Hides or shows the password
   */
  togglePassword() {
    this.show = !this.show;
  }

  /**
   * Called on submit of the login form.
   * Validates username and password in the authService, and if valid, navigates to the account page
   * Else, error will be displayed
   */
  onSubmit() {
    this.loading = true;
    const val = this.loginForm.value;
    if (val?.username && val?.password) {
      this.loginService.login(val.username, val.password).pipe(take(1)).subscribe({
        next: () => {
          this.router.navigate(['account']);
          this.loading = false;
        },
        error: (error) => {
          this.authError = error;
          this.loading = false;
        }
      });
    }
  }
}