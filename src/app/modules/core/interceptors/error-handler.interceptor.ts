import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, retry, throwError, timeout } from 'rxjs';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor() { }

  /**
   * Handles all of our errors
   * It will add a timeout and a retry before failing requests
   * It throws an error, which will show in our console
   * @param {HttpRequest<any>} request - our request
   * @param {HttpHandler} next - transforms our request into a response
   * @returns {Observable<any>}
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      timeout(10000),
      retry(1),
      catchError((error: any): any => {
        let errorMessage: string;
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
