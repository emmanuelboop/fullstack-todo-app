const { Pool } = require("pg")

const pool = new Pool({
    user: "postgres",
    password: "EmmaPg1234",
    port: 5432,
    host: "localhost",
    database: "todoapp",
})

module.exports = pool
