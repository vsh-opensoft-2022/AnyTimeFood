
const mysql = require('mysql2');

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'anytimefooddb',
    port: '3306'
});

dbConn.connect((err: any) => {
    if(err){
        console.log("ERROR in connecting to database!");
        throw err.stack;
    }
    console.log("database connection successfull!");
});

module.exports = dbConn;