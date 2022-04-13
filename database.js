const Pool = require('pg').Pool;
/*
const pool = new Pool({
    host: process.env.DB_CONNECTION,
    user: process.env.DB_USERNAME,
    port: process.env.PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
*/


const pool = new Pool({
host: "localhost",
user: "postgres",
port: "5432",
password: "@uest123!",
database: "postgres"
})

module.exports = pool;
