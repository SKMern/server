const connection = require("./mysql");


const createDatabaseIfNotExists = () => {
    const query = 'CREATE DATABASE IF NOT EXISTS user_products';
    connection.query(query, (err) => {
      if (err) {
        console.error('Error creating database:', err);
      } else {
        console.log('Database created or already exists');
      }
    });
  };
  
  module.exports = createDatabaseIfNotExists;