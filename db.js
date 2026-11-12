const { Pool } = require("pg");
module.exports = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Market",
  password: "20100313",
  port: 5432,
});