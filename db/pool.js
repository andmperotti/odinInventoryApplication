const { Pool } = require("pg");

module.exports = new Pool({
  connectionsString: process.env.remote_connection_string,
  ssl: {
    rejectUnauthorized: false,
  },
});
