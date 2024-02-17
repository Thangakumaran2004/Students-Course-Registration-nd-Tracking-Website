const mysql = require('mysql2');

// Creating  a  connection to the database

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Tst@2004',
  database: 'cbcs'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:',err);
    return;
  }
  console.log('Connected to the database!');
});


module.exports = db;