CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "username" varchar UNIQUE,
  "password" varchar,
  "updated_at" timestamp
);

CREATE TYPE "transaction_type" AS ENUM ('income', 'expense');
CREATE TABLE "transactions" (
  "id" serial PRIMARY KEY,
  "amount" integer,
  "type" transaction_type,
  "desciption" varchar,
  "user_id" integer,
  "category_id" integer,
  "updated_at" timestamp
);

CREATE TABLE "categories" (
  "id" serial PRIMARY KEY,
  "title" varchar
);

ALTER TABLE "transactions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "transactions" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");
