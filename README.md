# demo-typescript

This application demonstrates various features of TypeScript and Node.js.
It also demonstrates how to use some Node packages e.g. "pg" (used for connecting to PostgreSQL DB).

# Running the application

## Running demo-typescript in Docker container and making it connect to PostgreSQL DB running in another container


To build the image based on the Dockerfile, use;
```
$ docker build -t demo-typescript .
```

Before running demo-typescript container, use `$ docker network ls` to find the name of the network that PostgresDB container is conneted to and then `$ docker inspect <network_name>` to find the IP address of the Postgres DB container.

We can now run the container and pass DB network, IP and other configuration. `docker run` command can look like this:
```
$ docker run -e DB_HOST=172.16.239.2 -e DB_PORT=5432 -e DB_NAME=demo -e DB_USER=postgres -e DB_PASSWORD:postgres --rm -it --network=postgres-demo-net --name demo-typescript demo-typescript
```

### DB and test data

To spin off a Postgres instance, clone https://github.com/BojanKomazec/postgres-demo and launch it with docker-compose.

To create a test table and populate it with some dummy data, you can use an example from e.g. http://www.postgresqltutorial.com/postgresql-array/:
```
CREATE TABLE contacts (
   id serial PRIMARY KEY,
   name VARCHAR (100),
   phones TEXT [],
   magic_numbers INTEGER[]
);

INSERT INTO contacts (name, phones, magic_numbers)
VALUES
   (
      'John Doe',
      ARRAY [ '(408)-589-5846', '(408)-589-5555' ],
      ARRAY [ 1, 11, 111 ]
   ),
   (
      'Lily Bush',
      '{"(408)-589-5841"}',
      '{ 2, 22, 222}'
   ),
   (
      'William Gate',
      '{"(408)-589-5842","(408)-589-58423"}',
      '{ 3, 33, 333}'
   );
```

To run the application in a container use:
```
$ docker-compose up
```

If you change the code you need to rebuild the image before running the container:
```
$ docker-compose up --build
```

To stop the execution of the container, use:
```
$ docker-compose down
```

To remove the image and volumes, use:
 ```
 $ docker-compose down --rmi all --volumes
 ```
## Running the application on the local host

Application requires Node and PostgreSQL to be installed.

If all environment requirements are met, application can be run from command line (`npm run build && npm start`) but recommended way is to use Docker (Docker and docker-compose are required).

