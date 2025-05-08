# TestApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.10.
- This project demonstrates a simple login form in Angular using reactive forms. It includes form validation, API call simulation, error handling, and unit tests for the login component using Angular's standalone APIs.
- It also demonstrates routing using Routers in Angular on successful login.
- I have taken the liberity to demonstrate setting up proxy, when challenged on security roadblocks from Backend in development.
- Test cases for Login Component have been implemented and an attached screenshot of executed tests are included. 
# Clone Repo
In case of cloning this for running locally the URL is : https://github.com/aishwindersandhu/MEG_Test.git
## Development server
To start a local development server without , run:

```bash
ng serve 
```
To run this locally with proper API responses and flow, run with proxy.
To start a local development server with proxy to bypass cors issue and not be blocked, run:

```bash
ng serve --proxy-config proxy.conf.json
```
successfull login:
username: test-user
password:@x5Fn7yM$SdLxjor


Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests
1. For this test, I have implemented unit tests for Login Component as demonstration of how I approach maintainability and validation of code implemented.
2. The command will run tests only for Login Component at the moment.
3. The features tested:
- Validates Form Behaviour
- Mocks AuthService and Router
- Asserts success and failure flows.
- Handles API error.
To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:
![alt text](image.png)
```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

# Author
Aishwinder Sandhu
[LinkedIn](https://www.linkedin.com/in/aishwinder-sandhu-3b5002102/)
[Github](https://github.com/aishwindersandhu)
Email: aishwinder.sandhu@gmail.com

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
