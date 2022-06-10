import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { LoginComponent } from './component/login.component';
import { RouterModule, Routes } from '@angular/router';

const loginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  }
];


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(loginRoutes),
  ],
  exports: []
})
export class LoginModule { }
