const { Pool } = require("pg");

module.exports = new Pool({
  connectionString: process.env.remote_connection_string,
  ssl: {
    rejectUnauthorized: false,
  },
});
