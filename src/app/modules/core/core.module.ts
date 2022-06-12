import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatInputModule,
    MatCardModule,
    MatPaginatorModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent, 
    MatToolbarModule,
    ReactiveFormsModule, 
    MatProgressBarModule,
    MatFormFieldModule, 
    MatIconModule, 
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatPaginatorModule
  ]
})
export class CoreModule { }
