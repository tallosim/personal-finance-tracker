CREATE TABLE "users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "email" varchar UNIQUE NOT NULL,
  "password" varchar NOT NULL,
  "updated_at" timestamp NOT NULL
);

CREATE TYPE "transaction_type" AS ENUM ('income', 'expense');
CREATE TABLE "transactions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "amount" integer NOT NULL,
  "type" transaction_type NOT NULL,
  "occurred_at" timestamp NOT NULL,
  "description" varchar NOT NULL,
  "user_id" uuid NOT NULL,
  "category_id" uuid NOT NULL,
  "updated_at" timestamp NOT NULL
);

CREATE TABLE "categories" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "title" varchar UNIQUE NOT NULL,
  "sequence" integer NOT NULL
);

ALTER TABLE "transactions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "transactions" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");
