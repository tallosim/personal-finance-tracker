# Personal Finance Tracker - Backend

The backend of the personal finance tracker is built with Express.js.

## Endpoints

The API contains the following endpoints:

- `POST /api/login`
- `POST /api/users`
- `GET /api/users/{id}`
- `PUT /api/users/{id}`
- `DELETE /api/users/{id}`
- `GET /api/transactions`
- `POST /api/transactions`
- `GET /api/transactions/{id}`
- `PUT /api/transactions/{id}`
- `DELETE /api/transactions/{id}`
- `GET /api/categories`
- `GET /api/categories/{id}`

The detailed documentation of the API is available in the OpenAPI format, which can be accessed after the API is running at the following URL via Swagger UI: [http://localhost:8000/api-docs](http://localhost:8000/api-docs).

## Environment Variables

An example of the environment variables is available in the [.env.example](./.env.example) file.

## Running the API

To run the API, you need to have Node.js and Yarn installed on your machine.

After that, you can run the following commands:

```bash
# Install the dependencies
yarn install

# Run the API
yarn dev
```
