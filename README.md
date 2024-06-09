
# city-display
Displays various city data.

[![frontend tests](https://github.com/hasanheroglu/city-display/actions/workflows/ci-cd-frontend.yml/badge.svg)](https://github.com/hasanheroglu/city-display/actions/workflows/ci-cd-frontend.yml) 
[![backend tests](https://github.com/hasanheroglu/city-display/actions/workflows/ci-cd-backend.yml/badge.svg)](https://github.com/hasanheroglu/city-display/actions/workflows/ci-cd-backend.yml)

## Requirements
Node version must be v20.14.0 or above.

## Architecture
![city-display-arch](./assets/img/city-display-arch.png?raw=true)

The architecture of the system is shown above.

### Reverse Proxy
nginx server is used as a reverse proxy. It redirects the HTTP requests to frontend and backend services.

### Frontend
Developed with Typescript and Angular. Jasmine and Karma are used for testing. Leaflet library is used for Open Street Map integration.

### Backend
Developed with Typescript, Node.js, Express, and MongoDB. Jest, Supertest, and Docker are used for testing.

### Running the app
Run the command `docker-compose up --build` in the root directory.
After all the containers run successfully, the app is accessible on `localhost:80`. 