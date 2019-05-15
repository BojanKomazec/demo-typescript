# demo-typescript

This application demonstrates various features of TypeScript and Node.js.
It also demonstrates how to use some Node packages e.g. "pg" (used for connecting to PostgreSQL DB).

## Running

Application requires Node and PostgreSQL to be installed.

If all environment requirements are met, application can be run from command line (`npm run build && npm start`) but recommended way is to use Docker (Docker and docker-compose are required).

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
