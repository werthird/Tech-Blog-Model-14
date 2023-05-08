// The connection file, connects to the database. 

// Requirements
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// Checks is Heroku is offering a database
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // Else, set up our own connection to our own database.
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
