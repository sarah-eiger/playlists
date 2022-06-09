import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './modules/core/core.module';
import { CanLoadGuard } from './modules/core/guards/can-load.guard';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule
  ],
  providers: [CanLoadGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
