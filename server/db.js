const { Pool } = require("pg")

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = pool

/*user: "postgres",
    password: "EmmaPg1234",
    port: 5432,
    host: "localhost",
    database: "todoapp",
*/