const Pool = require('pg').Pool;
const pool = new Pool({
host: "localhost",
user: "postgres",
port: "5432",
password: process.env.POSTGRES_PWD,
database: "postgres"
})



module.exports = pool;