const { Pool } = require("pg");

module.exports = new Pool({
  // connectionString: process.env.local_connection_string,
  host: process.env.host,
  user: process.env.user,
  database: process.env.database,
  password: process.env.passwrod,
  port: process.env.port,
});
