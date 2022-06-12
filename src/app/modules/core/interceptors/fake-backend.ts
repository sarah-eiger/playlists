import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from '../../login/models/login-models';
import { FeaturedPlaylists } from '../../playlists/models/playlist.models';
import { featuredPlaylists } from 'src/app/api/mock-database';
import { users } from 'src/app/api/mock-database';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    private users: User[] = users;

    constructor() { }

    /**
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
            .pipe(materialize()) //then call materialize, delay and dematerialize to mimic a delayed backend response
            .pipe(delay(1500))
            .pipe(dematerialize());


        /**
         * Takes the route from our request URL and sends us onwards to the correct function(s)
         * These are all of the httpRequests that exist in the app
         * @returns {Observable<HttpEvent<any>>}
         */
        function handleRoute(): Observable<HttpEvent<any>> {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/playlists/getPlaylists') && method === 'GET':
                    return getPlaylists();
                case url.endsWith('/users/getUser') && method === 'GET':
                    return getUser();
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
            if (!user) return error('Username or password is incorrect. Please try again.');
            return ok({
                id: user?.id,
                username: user?.username,
                firstName: user?.firstName,
                lastName: user?.lastName,
                password: user?.password,
                token: 'fake-auth-token'
            })
        }

        /**
         * Gets all of the playlists
         * @returns {Observable<HttpResponse<FeaturedPlaylists[]>>} - returns our playlists in a 200 response; or an error
         */
        function getPlaylists(): Observable<HttpResponse<FeaturedPlaylists[]>> {
            if (!featuredPlaylists) return error('No playlists found!')
            return ok(featuredPlaylists)
        };

        /**
         * Gets a specific user given a userID
         * @returns {Observable<HttpResponse<User[]>>} - returns one user in a 200 response; or an error
         */
        function getUser(): Observable<HttpResponse<User[]>> {
            const userId = request.params.get('userId')
            const user: User | undefined = that.users.find(x => x.id.toString() === userId);
            if (!user) return error(`No user found given the user ID ${userId}.`);
            return ok({
                id: user?.id,
                username: user?.username,
                firstName: user?.firstName,
                lastName: user?.lastName,
                password: user?.password,
                token: 'fake-auth-token'
            })
        }

        /**
         * Creates an ok response
         * @param {any} body
         * @returns {Observable<HttpResponse<any>> }
         */
        function ok(body?: any): Observable<HttpResponse<any>> {
            return of(new HttpResponse({ status: 200, body }))
        }

        /**
         * Creates an error response
         * @param {string} message 
         * @returns {Observable<never>}
         */
        function error(message: string): Observable<never> {
            return throwError(() => new Error(message));
        }
    }
}