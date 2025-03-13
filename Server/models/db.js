// const mysql = require('mysql2/promise');
// const bcrypt = require('bcryptjs');
// require('dotenv').config();


// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     ssl: { rejectUnauthorized: true },
//     waitForConnections: true,
//     connectTimeout: 30000,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// module.exports = pool;


const mysql = require("mysql2/promise");
require("dotenv").config();

async function executeQuery(sql, params) {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
            ssl: { rejectUnauthorized: false }
        });

        const [rows] = await connection.execute(sql, params);
        return rows;
    } catch (error) {
        console.error("Database query error:", error);
        throw error;
    } finally {
        if (connection) await connection.end();  // Close connection after query
    }
}

module.exports = { executeQuery };
