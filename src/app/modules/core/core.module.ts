import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatIconModule
  ],
  exports: [HeaderComponent, FooterComponent, MatToolbarModule, ReactiveFormsModule, MatProgressBarModule, MatFormFieldModule, MatIconModule]
})
export class CoreModule { }
