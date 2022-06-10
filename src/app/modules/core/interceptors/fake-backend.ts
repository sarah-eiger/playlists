import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from '../../login/models/login-models';
import { FeaturedPlaylists } from '../../playlists/models/playlist.models';
import { featuredPlaylists } from 'src/app/api/mock-database';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    //our fake database
    private users: User[] = [
        {
            id: 1,
            username: 'test',
            password: 'test',
            firstName: 'Sarah',
            lastName: 'Eiger'
        },
        {
            id: 2,
            username: 'test1',
            password: 'test2',
            firstName: 'John',
            lastName: 'Smith'
        }
    ];

    /**
     * This is the final interceptor that is called
     * This interceptor handles all http request and mocks a backend response
     * @param {HttpRequest<any>} request - any HTTP request
     * @param {HttpHandler} next - transforms an HttpRequest into a stream of HttpEvents, one of which will likely be an HttpResponse
     * @returns {Observable<HttpEvent<any>>} - returns an HttpEvent handler
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, body } = request;
        let that = this;

        return of(null) //empty observable wrapper
            .pipe(mergeMap(handleRoute)) //first, calls our handleRoute function which creates our HTTP response
            .pipe(materialize()) //then call materialize, delay and dematerialize to ensure delay even if an error is thrown
            .pipe(delay(1500))
            .pipe(dematerialize());


        /**
         * Takes the route from our request URL and sends us onwards to the correct function(s)
         * @returns {Observable<HttpEvent<any>>}
         */
        function handleRoute(): Observable<HttpEvent<any>> {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/playlists/getPlaylists') && method === 'GET':
                    return getPlaylists();
                default:
                    // pass on any requests not handled above
                    return next.handle(request);
            }
        }

        /**
         * Authenticates a user if we are logging in
         * Finds their details in our database to check their credentials
         * @returns {Observable<HttpResponse<User[]>>} - returns our authenticated user in a 200 response; or an error
         */
        function authenticate(): Observable<HttpResponse<User[]>> {
            const { username, password } = body;
            const user: User | undefined = that.users.find(x => x.username === atob(username) && x.password === atob(password));
            if (!user) return error('Email or password is incorrect. Please try again.');
            return ok([{
                id: user?.id,
                username: user?.username,
                firstName: user?.firstName,
                lastName: user?.lastName,
                password: user?.password,
                // favourites: user?.favourites,
                token: 'fake-auth-token'
            }])
        }

        function getPlaylists(): Observable<HttpResponse<FeaturedPlaylists[]>> {
            if (!featuredPlaylists) return error('No playlists found!')
            return ok(featuredPlaylists)
        };

        // ******* helper functions ******* //
        function ok(body?: any): Observable<HttpResponse<any>> {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message: string): Observable<never> {
            return throwError(() => new Error(message));
        }
    }
}