import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    private requests: HttpRequest<any>[] = [];

    constructor(private loadingService: LoadingService) { }

    /**
     * This intercepts all HTTP requests to add our loading spinner
     * It sets the loadingSubject to true on request start
     * @param {HttpRequest<any>} request - the request we are intercepting
     * @param {HttpHandler} next - handles the next interceptor in our chain
     * @returns {Observable<HttpEvent<any>>}
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingService.loadingSubject$.next(true);
        this.requests.push(request);
        // We create a new observable which we return instead of the original
        return new Observable(observer => {
            // And subscribe to the observable to ensure the HttpRequest is made
            const subscription = next.handle(request)
                .subscribe({
                    error: (err) => {
                        this.removeRequest(request);
                        observer.error(err);
                    },
                    next: (event) => {
                        if (event instanceof HttpResponse) {
                            this.removeRequest(request);
                            observer.next(event);
                        }
                    },
                    complete: () => {
                        this.removeRequest(request);
                        observer.complete();
                    },
                })
            // in case of cancelled requests
            return () => {
                this.removeRequest(request);
                subscription.unsubscribe();
            };
        });
    }

    /**
    * This removes a request from our requests array
    * Sets the loadingSubject to false to stop our loading spinner if all requests are finished
    * @param {HttpRequest<any>} requestToRemove - the request we will be removing from our array
    */
    private removeRequest(requestToRemove: HttpRequest<any>) {
        const i = this.requests.indexOf(requestToRemove);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        if (this.requests.length === 0) {
            this.loadingService.loadingSubject$.next(false);
        }
    }
}