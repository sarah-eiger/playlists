import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/component/account.component';

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
    RouterModule,
    RouterModule.forChild(accountRoutes)
  ],
  exports: [RouterModule]
})
export class AccountModule { }
