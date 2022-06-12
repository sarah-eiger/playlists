import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './modules/core/core.module';
import { CanLoadGuard } from './modules/core/guards/can-load.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './modules/core/interceptors/auth.interceptor';
import { ErrorHandlerInterceptor } from './modules/core/interceptors/error-handler.interceptor';
import { FakeBackendInterceptor } from './modules/core/interceptors/fake-backend';
import { LoadingInterceptor } from './modules/core/interceptors/loading.interceptor';

import { StoreModule } from "@ngrx/store";
import { userReducer } from './store/reducers/user.reducer';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    StoreModule.forRoot({ user: userReducer })
  ],
  providers: [CanLoadGuard, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeBackendInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
