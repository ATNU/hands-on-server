# Hands-On Reading Server
Server for the Hands-On Reading project, built using [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Developers
[Kate Court](www.github.com/katecourt)   
[Fiona Galston](https://github.com/fiona-galston)

## Researchers
[Aditi Nafde](https://www.ncl.ac.uk/elll/staff/profile/aditinafde.html#background)   
[Matt Coneys](https://www.ncl.ac.uk/elll/staff/profile/matthewconeys.html#background)   
[James Cummings](https://www.ncl.ac.uk/elll/staff/profile/jamescummings.html#background)    
[Tiago Sousa Garcia](https://www.ncl.ac.uk/elll/staff/profile/tiagosousa-garcia.html#publications) 

## Environment variables
The server runs locally with the following environment variables stored in a .env file stored at the root level. 
DB_CONNECTION_STRING=mongodb://localhost:27017/hands-on-db
JWT_SECRET

## Running the app
The server and client must be run in conjunction with either a locally installed version of mongoDB or mongoDB running in Docker.
You must have an .env file at the root of the repo with the JWT_SECRET and DB_CONNECTION_STRING environment variable set (or set this variable in another way, e.g. through a docker compose file).


```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


