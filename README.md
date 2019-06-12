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

Database specified by `POSTGRES_DB` environment variable in `docker-compose.yml` is created only on the first creation of the Postgres instance (when database data directory is empty). To allow re-creation of this database, delete the shared db data volume and delete this directory e.g.:
```
$ sudo rm -rf ./data/postgres/
```
To connect to the DB container use:
```
$ docker exec -ti <container_name> bash
```
Check container name via `docker contaner ls`.

For debugging purposes, here is the terminal output of the `docker-compose up` command if only `db` service is enabled in yml file:
```
$ docker-compose up
Creating network "demo-typescript_default" with the default driver
Pulling db (postgres:)...
latest: Pulling from library/postgres
743f2d6c1f65: Pulling fs layer
5d307000f290: Pulling fs layer
...
Status: Downloaded newer image for postgres:latest
Creating demo-typescript_db_1 ... done
Attaching to demo-typescript_db_1
db_1  | The files belonging to this database system will be owned by user "postgres".
db_1  | This user must also own the server process.
db_1  | 
db_1  | The database cluster will be initialized with locale "en_US.utf8".
db_1  | The default database encoding has accordingly been set to "UTF8".
db_1  | The default text search configuration will be set to "english".
db_1  | 
db_1  | Data page checksums are disabled.
db_1  | 
db_1  | fixing permissions on existing directory /var/lib/postgresql/data ... ok
db_1  | creating subdirectories ... ok
db_1  | selecting default max_connections ... 100
db_1  | selecting default shared_buffers ... 128MB
db_1  | selecting dynamic shared memory implementation ... posix
db_1  | creating configuration files ... ok
db_1  | running bootstrap script ... ok
db_1  | performing post-bootstrap initialization ... ok
db_1  | syncing data to disk ... ok
db_1  | 
db_1  | Success. You can now start the database server using:
db_1  | 
db_1  |     pg_ctl -D /var/lib/postgresql/data -l logfile start
db_1  | 
db_1  | 
db_1  | WARNING: enabling "trust" authentication for local connections
db_1  | You can change this by editing pg_hba.conf or using the option -A, or
db_1  | --auth-local and --auth-host, the next time you run initdb.
db_1  | ****************************************************
db_1  | WARNING: No password has been set for the database.
db_1  |          This will allow anyone with access to the
db_1  |          Postgres port to access your database. In
db_1  |          Docker's default configuration, this is
db_1  |          effectively any other container on the same
db_1  |          system.
db_1  | 
db_1  |          Use "-e POSTGRES_PASSWORD=password" to set
db_1  |          it in "docker run".
db_1  | ****************************************************
db_1  | waiting for server to start....2019-05-30 15:14:51.252 UTC [43] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
db_1  | 2019-05-30 15:14:51.294 UTC [44] LOG:  database system was shut down at 2019-05-30 15:14:50 UTC
db_1  | 2019-05-30 15:14:51.303 UTC [43] LOG:  database system is ready to accept connections
db_1  |  done
db_1  | server started
db_1  | CREATE DATABASE
db_1  | 
db_1  | 
db_1  | /usr/local/bin/docker-entrypoint.sh: ignoring /docker-entrypoint-initdb.d/*
db_1  | 
db_1  | waiting for server to shut down...2019-05-30 15:14:51.737 UTC [43] LOG:  received fast shutdown request
db_1  | .2019-05-30 15:14:51.744 UTC [43] LOG:  aborting any active transactions
db_1  | 2019-05-30 15:14:51.747 UTC [43] LOG:  background worker "logical replication launcher" (PID 50) exited with exit code 1
db_1  | 2019-05-30 15:14:51.747 UTC [45] LOG:  shutting down
db_1  | 2019-05-30 15:14:51.784 UTC [43] LOG:  database system is shut down
db_1  |  done
db_1  | server stopped
db_1  | 
db_1  | PostgreSQL init process complete; ready for start up.
db_1  | 
db_1  | 2019-05-30 15:14:51.859 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
db_1  | 2019-05-30 15:14:51.859 UTC [1] LOG:  listening on IPv6 address "::", port 5432
db_1  | 2019-05-30 15:14:51.864 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
db_1  | 2019-05-30 15:14:51.894 UTC [61] LOG:  database system was shut down at 2019-05-30 15:14:51 UTC
db_1  | 2019-05-30 15:14:51.904 UTC [1] LOG:  database system is ready to accept connections
```

Note the presence of `CREATE DATABASE` command which indicates that process did create database specified in yml file.
