const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root!',
});

mysqlConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');

    // Check if the database exists or not
    mysqlConnection.query("CREATE DATABASE IF NOT EXISTS userProducts", (err) => {
      if (err) {
        console.error('Error creating database:', err);
      } else {
        console.log('Database created or already exists');

        // Now you can connect to the specific database
        mysqlConnection.changeUser({ database: "userProducts" }, (err) => {
          if (err) {
            console.error('Error changing to database:', err);
          } else {
            console.log('Connected to userProducts database');
          }
        });
      }
    });
  }
});

module.exports = mysqlConnection;