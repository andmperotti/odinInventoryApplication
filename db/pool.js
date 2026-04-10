const { Pool } = require("pg");

module.exports = new Pool({
  // connectionString: process.env.local_connection_string,
  connectionsString: process.env.remote_connection_string,
});
