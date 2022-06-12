import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { take } from 'rxjs/operators';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})

export class LoginComponent {

  public loginForm: FormGroup;
  public show: boolean = false;
  public loading: boolean = false;
  public authError: string = '';

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, public loadingService: LoadingService) { 
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

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
    this.loading = true; //this sets the text for the 'login' button
    const val = this.loginForm.value;
    if (val?.username && val?.password) {
      this.authService.login(val.username, val.password).pipe(take(1)).subscribe({
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