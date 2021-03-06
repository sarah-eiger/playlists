# Playlists

This is an application written in Angular 13.3.3. It is an application which has 4 pages - a homepage, a playlists page, a login page and an account page.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

--------------------------

## Skeleton overview

Here is a brief overview of the architecture of the application:
- app:
    - api: folder containing our mock database (playlists and users) as well as our API requests to fetch this data
    - modules: our main modules folder
       - account: account component
       - core: core components (header and footer)/services/guards/interceptors/resolvers used accross the application
       - homepage: homepage component
       - login: login component
       - playlists: playlists component
    - store: our ngrx store, used here to store the user state
    - app-routing.module: lazily loads modules and integrates guards/resolvers
    - app-component: displays views using router outlet and handles routing animation. OnInit, we also set a user state in the store if there is a stored userId in localStorage
    - app.module: main app module

## Technical overview

The app consists of 4 standalone modules - homepage, playlists, login and account. Along with this are two core modules - header and footer - which are shared across all views. All modules are lazily loaded to save time on initial app load, and all utilise Angular Material and additional styling in SCSS. Models are used throughout for strongly-typed interfaces. Linting can be run with `ng lint`.

### Routing

Navigation to each page is handled by Angular routing, and router-outlet is used to render views in the app.component.html. We have two route guards in place, which are both used for the accounts.module - canLoad, which prevents us being able to load the accounts module if we are not authorised; and also canActivate, which prevents access even after you've been able to load the page (e.g. you logged in, loaded the module, but then logged out). We need both, because canLoad prevents initial waste of memory by stopping the page loading at all. But after loading, it won't have any effect, so canActivate listens to any future authorization changes. 

We also use one resolver in our routing - playlists.resolver - which loads playlist data before we route to the playlists page. I considered storing the playlist data somewhere locally after initial load (e.g. localStorage, or in our store), but I thought that, since this data might be changing frequently, I want to load it fresh each time we open the page.

### APIs

I have two different API services - an auth-api.service, and a playlist-api.service. AuthAPI has an authenticate function, which is a POST request to authenticate a user's details when they login. It also has a GET request to retrieve a user based on user ID, which we use on initial app load so users are not logged out after page refresh. PlaylistAPI has one GET request - getPlaylists() - which loads our playlist data. In the SPI folder, I also have our mock-database, which stores user and playlist details. I wanted to call the playlist endpoint directly instead of storing the data, but I was getting CORS errors, so I copied the JSON content into the mock-database file instead.

### Interceptors

There are 4 interceptors in this application. 

The loading interceptor, which stores any running HTTP requests and updates the loadingSubject in the loading.service.ts file. The app.component listens to this subject, and displays a loading bar if any requests are currently in progress; and removes the loading bar when they stop.

The auth interceptor adds an authentication token (if available) and a few headers (content-type, accept) to all requests. This is where we would continue to add any data we would want to add to every request. My APIs currently do not require an auth token, but if this were a live app, I would put this in place for security reasons.

The fake-backend interceptor basically mimics a backend. Here is where all requests are intercepted and handled. If we are able to find what we are looking for in our mock-database, we send an 'ok' response with any data we requested. Otherwise, we send back an error. We delay our requests to mimic a real backend response and also to allow time for our loading bar to be shown.

The error interceptor is where all errors are caught and handled. Ideally, this would be linked to an error-dialog, which could pop-up to display any relevant error messages to the user. But for now, errors are logged in the console.

### Auth Service

This service does the main workings for our user authentication, and communicates between our APIs, interceptors and components. I originally stored the service in the login module, but realised it had utility across the app. For example, our guards use the 'logout' function if it notices our authentication cookie has expired; our header calls logout() when we click the logout button; and our auth.interceptor and guards call getAuthCookie() to check a users authorization status. 

### Account Module

Fairly simple module. Gets the current user value from the store to display the user's details.

### Header Module

Also listens to the store's user value in order to render a 'logout' button conditionally if a user is logged in. Also connects to our logout() function in the auth.service if this button is clicked.

### Footer Module, Homepage Module

Statically coded, very simple.

### Login Module

Utilises Angular reactive forms to handle username and password values. 'Required' validators are implemented. 'Login' button is disabled if the login form is invalid. Login can be tested with `username: test password: test`; or `username: test1 password: test2`. An error div will show if login throws an error response (can test by typing any unknown username/password value). Password input can be toggled to show/hide value. Whilst login is loading, the 'Login' button will display as disabled 'Loading' button.

### Playlists Module

As stated above, playlist data is retrieved before this module loads using our resolver. We assign this value to a dataSource. Although dataSource is normally used for mat-tables, I decided to use it here with mat-cards as it simplifies the process of adding/handling filters and pagination, both of which are used here. I then connect the database to a playlists$ observable, which we render using ngFor and the async pipe in the template. The paginator is added in the ngAfterViewInit lifecycle hook, because adding it at a sooner point prevents it rendering properly. On click of a mat-card, it will navigate you externally to the playlist's url.

A couple challenges I faced here: 1) it took me some time to learn how the dataSource can be added to mat-cards. With mat-tables, it is simply bound to a table on the template (`[dataSource]=dataSource`). I didn't know dataSource could be connected via the 'connect()' method. Another issue was I was getting an `ExpressionChangedAfterItHasBeenCheckedError` each time playlists were loaded. I wasn't 100% sure why, but I think it's because I am adding a dataSource and a paginator to my playlists$ at different points, so it's going through different changes whilst the app is loading. I was able to resolve this by manually calling detectChanges(), but I wasn't certain if this is the best solution.

### NgRx Store

Here we store the user state. It is currently the only state being managed in the application, however, you will see that I have the entire AppState in the index.ts file, and separate folders for the user states, so it is ready to be added to. If I had more time, I would have liked to add a 'favourites' list to the playlists, and allow a user to add/remove 'favourites' using the store.

I found the set-up quite challenging - last time I implemented a store (and the way it is in our own apps) is different to the current version of NgRx, so I had to re-learn how to set it all up. There aren't too many guides around with the newest version, so I took intruction from the official ngrx.io docs.

One thing I spent time considering was how to ensure we still have user data after page refresh, as I would not want a user to be automatically logged out. I noticed state is deleted when we refresh the page, so I needed to ensure it was stored. Because I am only storing user data, I did not do a full implementation of linking store to localStorage. I instead set/clear localStorage in the user reducers manually. If this were a bigger project, perhaps I would integrate a library which would automatically link store data to localStorage or write this manually.

### Tests

I tried to aim for at least 80% unit test coverage. If this was a production application, I would also like to see some E2E tests, to ensure the whole user journey is covered (e.g. with Cypress), however, I considered it out of scope for this, as in such a small app, unit tests provide sufficient confidence.

If I had more time, I would like to have implemented better store and resolver testing. These were two things I haven't written unit tests for before (I previously have only really tested components), so my tests for these things are quite brief and simple, and I am sure they could be improved.