const mysql = require('mysql');
require('dotenv').config()

const dbData = {
    host: 'localhost',
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB
}

const conn = mysql.createConnection(dbData);

// const conn = db.connect((err)=>{
//     if (err) {
//         console.log(err)
//     }
//     else{
//         console.log("DB Connected Succesfully")
//     }
// })

module.exports = conn;