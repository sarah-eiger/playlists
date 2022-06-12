import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './component/account.component';

const accountRoutes: Routes = [
  {
    path: '',
    component: AccountComponent,
  }
];

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(accountRoutes)
  ],
  exports: []
})

export class AccountModule { }