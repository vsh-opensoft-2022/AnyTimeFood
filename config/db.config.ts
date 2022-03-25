const mysql = require('mysql2');

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Magicjack@123',
    database: 'anytimefooddb'
});

module.exports = dbConn;