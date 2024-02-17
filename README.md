# Personal Finance Tracker

A simple personal finance tracker.

The API is built with Express.js and the database is PostgreSQL.

## API

The API is built with Express.js.

The API is documented with OpenAPI 3.0.3. The documentation is available at [/api-docs](http://localhost:3000/api-docs).

## Development

### Prerequisites

- [Docker](https://www.docker.com/)
- [psql](https://www.postgresql.org/docs/current/app-psql.html)

### Database

Build the database with the following command:

```bash
docker build -t personal_finance_tracker_db database/
```

Run the database with the following command:

```bash
docker run -e POSTGRES_PASSWORD=password -p 5432:5432 -d personal_finance_tracker_db
```

Login to the database with the following command (password is `password`):

```bash
psql -h localhost -U postgres
```
