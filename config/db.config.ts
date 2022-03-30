
const mysql = require('mysql2');

const dbConn = mysql.createConnection({
    host: 'anytimefood.cpavwkcja63z.ap-south-1.rds.amazonaws.com',
    user: 'admin',
    password: 'password123',
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