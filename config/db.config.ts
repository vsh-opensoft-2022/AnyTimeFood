
const mysql = require('mysql2');

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'anytimefooddb'
});

module.exports = dbConn;