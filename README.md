# ChargeIT

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Key Points
- Modular design
    - Did not use lazy loading as there isn't more than one signficant module
- Component level breakdown
- Input & Output (Event Emitters)
- Pipes
- Used TOMTOM map services and 'leaflet'
- Dependency Injection
- Usage of Interceptor
- Unit Test (16 no.s)

## Nice to haves
- Implemented Marker clustering
- Created a Docker container that runs the application (ziyadumar/charge-it)
- Unit Tests
## Docker & Docker-compose

To build from source (./Dockerfile)
`docker build . -t _user/_reponame:tagname`
Push to hub.docker.com (login is prerequisite)
`docker push _user/_reponame:tagname`

### OR

Pull from the built image (./docker-compose.yml)
`docker-compose up -d`

### Disclaimer

Some data from the API are inconsistent, therefore empty values are present.
HTTPS host required for API access. (or CORS will deny access)
