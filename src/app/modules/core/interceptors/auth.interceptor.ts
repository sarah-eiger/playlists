import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    /**
     * This interceptor adds headers to all requests
     * Here, we set 'content-type' and 'accept'
     * If we have an auth-token, we add that, too, which would enable us to access endpoints which require authorization (not used in this app)
     * @param {HttpRequest<any>} request - our request
     * @param {HttpHandler} next - transforms our request into a response
     * @returns {Observable<HttpEvent<any>>}
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.authService.getAuthCookie();

        request = request.clone({
            headers: request.headers
                .set('Content-Type', 'application/json-path+json')
                .set('Accept', 'application/json')
        });

        if (authToken) {
            request = request.clone({
                headers: request.headers
                    .set('Authorization', `Bearer ${authToken}`)
            });
        }

        return next.handle(request);
    }
}