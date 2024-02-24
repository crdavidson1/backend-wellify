# Northcoders News API

## Table of Contents

- [Project Summary](#project-summary)
- [Install](#install)
- [Usage](#usage)
    - [Seeding the Database](#seeding-the-database)
	- [Environment Variables](#environment-variables)
    - [Minimum Versions Required](#minimum-versions-required)
- [API](#api)

## Project Summary

This project creates an API that allows users to access application data programmatically. It is designed to mimic a real world backend service (such as Reddit), which must provide information to the front end architecture. The database is built in PSQL and node-postgres is used for interfacing with the database.

## Install

To run this project, the repo must be cloned in your local directory.

This project relies on [node](http://nodejs.org) and [npm](https://npmjs.com). Node.js version 6.9 and Postgres version 15.5 are the minimum versions required for this project.

Using npm, the following dependencies must be installed: 
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://expressjs.com/)
- [husky](https://typicode.github.io/husky/)
- [pg](https://www.npmjs.com/package/pg)
- [pg-format](https://www.npmjs.com/package/pg-format)


## Usage

### Environment Variables

To set the environment variables, you will need to create two .env files for your project: .env.test and .env.development. Into each, add PGDATABASE=, with the correct database name for that environment (see /db/setup.sql for the database names).

### Seeding the Database

Once the project has been installed with its required dependencies, the following command can be used to setup and then seed the databases.

```sh
$ npm run setup-dbs
$ npm run seed
```

The project can be tested by running Jest on the app.test.js file.

```sh
$ npm test app.test.js
```

## API 

The hosted version of this project can be found on [Render](https://backend-project-cr4a.onrender.com)

