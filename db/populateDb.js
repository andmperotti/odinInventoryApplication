#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE SCHEMA IF NOT EXISTS public;
CREATE TABLE IF NOT EXISTS public.categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT 
);

INSERT INTO categories (name) VALUES ('shorts');

CREATE TABLE IF NOT EXISTS public.items (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name TEXT, quantity INTEGER, price INTEGER, categoryIds TEXT);

INSERT INTO items (name, quantity, price, categoryIds) VALUES ('wubby', 8, 100, '[1]');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.local_connection_string,
  });
  //if you wanted to pass the db location when executing this script then you would access that argument to the script in the above line using process.argv
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
