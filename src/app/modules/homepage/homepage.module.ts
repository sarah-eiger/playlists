import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './component/homepage.component';
import { CoreModule } from '../core/core.module';

const homepageRoutes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  }
];


@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(homepageRoutes),
    CoreModule
  ],
})
export class HomepageModule { }
