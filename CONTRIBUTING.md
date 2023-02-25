# Contributing to pickasam-api
## Prerequisites
In order to contribute to the project, you will need to have the following tools installed on your local machine :

- [Node.js](https://nodejs.org/en/)
- [Yarn >= 2](https://yarnpkg.com/getting-started/install)
- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## SSL Certificates
Since

## Installation
To install the required dependencies, simply run the following command :

```shell
yarn install
```

## Build
To compile the TypeScript source files into JavaScript run the following command :

```shell
yarn build
```

## Database
The server needs a MySQL database to connect to in order to work properly. To help you set up one, I created a
Docker Compose file in the `db` directory of the repository. To start the services, run the following command inside
the `db` directory :

```shell
docker-compose up
```

This command will start up a MySQL Docker Container, accessible through the port `3306`. It will also initialize the
database with a set of development data containing 4 test pictures. If you want to edit the initialization routine, you
can edit the following files :

- `db/files` : Mounted volume containing the mock pictures
- `db/scripts/data.sql` : Inserts rows to a database at initialization

## HTTPS protocal and SSL Certificates
If you set the `Server__Https` environment variable to `true`, the server will be listening using the secure HTTPS
protocol. In order for this to work, you will need to provide an SSL certificate and its private key. The path to these
files can be configured using the `Server__SSLCertificate` and `Server__SSLPrivateKey` environment variables
respectively (see the Configuration section below).

## Start the server
To start the server, run the following command :

```shell
yarn start
```

The server will start listening on the port specified by the configuration options.

## Configuration
The server can be configured using environment variables. The list of configuration options is given below. To make it
easier to configure, `.env` file can be created at the root of the repository (it will be ignored by git) containing
environment variables setups.


| Environment Variable   | Default               | Accepted Values                                                                 | Description                                                                     |
|------------------------|-----------------------|---------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| Server__Port           | `3000`                | `number`                                                                        | The listening port of the server                                                |
| Server__Https          | `false`               | `boolean`                                                                       | Boolean indicating if the server should be run using HTTPS secure protocol      |
| Server__SSLCertificate | `cert.pem`            | `string`                                                                        | Path to the SSL certificate file (only required if using HTTPS)                 |
| Server__SSLPrivateKey  | `key.pem`             | `string`                                                                        | Path to the SSL private key file (only required if using HTTPS)                 |
| Database__Dialect      | `mysql`               | `mysql`, `postgres`, `sqlite`, `mariadb`, `mssql`, `db2`, `snowflake`, `oracle` | Database dialect for sequelize                                                  |
| Database__Host         | `localhost`           | `string`                                                                        | Database host                                                                   |
| Database_Database      | `pickasam`            | `string`                                                                        | SQL database to connect to                                                      |
| Database__Username     | `user_dev`            | `string`                                                                        | Username used to connect to the database                                        |
| Database__Password     | `password_dev`        | `string`                                                                        | Password used to connect to the database                                        |
| Logger__Level          | `info`                | `trace`, `debug`, `info`, `warn`, `error`, `fatal`                              | Minimal level of logs to display                                                |
| Logger__Stream         | `bunyan-debug-stream` | `stdout`, `bunyan-debug-stream`                                                 | The output stream for the logs                                                  |
| Logger__ShowHeaders    | `false`               | `boolean`                                                                       | Show the request and response headers in the request logs (level : `info`)      |
| Logger_ShowSQL         | `false`               | `boolean`                                                                       | Show the SQL queries in the logs (level : `trace`)                              |
| Elo__KFactor           | `32`                  | `number`                                                                        | The K factor for the elo rating system. See the main README for more info.      |
| Elo__ScaleFFactor      | `400`                 | `number`                                                                        | The scale factor for the elo rating system. See the main README for more info.  |
| Elo__ExponentBase      | `10`                  | `number`                                                                        | The exponent base for the elo rating system. See the main README for more info. |


