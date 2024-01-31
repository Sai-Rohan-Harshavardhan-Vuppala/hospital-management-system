require('dotenv').config()
const mysql = require('mysql2');
var conn = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: {
    rejectUnauthorized: true
  }
});

conn.connect((err) => {
  if (err) {
    console.log(err + '----');
  } else {
    console.log('mysql database connected');
    
  }
});

mysqlQuery = (query) => {
  return new Promise((resolve, reject) => {
    conn.query(query, (err, result, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = mysqlQuery;
