const mysql = require('mysql2');
//database connection instance to access the database
const dbConn = mysql.createConnection({
    host: 'anytimefood.cpavwkcja63z.ap-south-1.rds.amazonaws.com',
    user: 'admin',
    password: 'password123',
    database: 'anytimefooddb',
    port: '3306'
});

//verifying the connection to the database
dbConn.connect((err: any) => {
    if(err){
        console.log("ERROR in connecting to database!");
        throw err;
    }
    console.log("database connection successfull!");
});

module.exports = dbConn;