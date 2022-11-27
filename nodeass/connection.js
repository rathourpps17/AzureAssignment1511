const mysql =require('mysql2');


const con =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'angularassignment',
    port:3306
});

con.connect((err) =>{
    if(err) throw err;
    else
    console.log('database connected');
});

module.exports.con=con;
//module.exports =dbconnection;