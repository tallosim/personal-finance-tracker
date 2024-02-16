CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "username" varchar UNIQUE,
  "password" varchar,
  "updated_at" timestamp
);

CREATE TABLE "finances" (
  "id" serial PRIMARY KEY,
  "amount" integer,
  "desciption" varchar,
  "user_id" integer,
  "category_id" integer,
  "updated_at" timestamp
);

CREATE TABLE "categories" (
  "id" serial PRIMARY KEY,
  "title" varchar
);

ALTER TABLE "finances" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "finances" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");
