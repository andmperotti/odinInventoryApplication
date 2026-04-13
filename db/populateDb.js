#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE SCHEMA IF NOT EXISTS public;
CREATE TABLE IF NOT EXISTS public.categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT 
);

INSERT INTO categories (name)
SELECT 'shorts'
WHERE NOT EXISTS (SELECT 1 FROM categories);

CREATE TABLE IF NOT EXISTS public.items (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name TEXT, quantity INTEGER, price INTEGER, categoryId INTEGER);

INSERT INTO items (name, quantity, price, categoryId)
SELECT 'wubby', 8, 100, 1
WHERE NOT EXISTS (SELECT 1 FROM items);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.remote_connection_string,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
