const Pool = require('pg').Pool;
const fs = require('fs');

const pool = new Pool({
    host: process.env.DB_CONNECTION,
    user: process.env.DB_USERNAME,
    port: process.env.PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        ca: fs
          .readFileSync("./us-east-1-bundle.pem")
          .toString()
      }
});


/*
const pool = new Pool({
host: "localhost",
user: "postgres",
port: "5432",
password: "@uest123!",
database: "postgres"
})*/

module.exports = pool;
