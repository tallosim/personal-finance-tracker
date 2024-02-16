# Personal Finance Tracker

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
