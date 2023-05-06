// The connection file, connects to the database. 

// Requirements
  // Imports Sequelize
const Sequelize = require('sequelize');
  // Imports the dotenv module so that we can keep out database login info seperate from our deployed site.
  // The .config() is a method that would be used to specify the file path to the .env. If its in the root folder, then the method can remain empty
require('dotenv').config();

// Used to store our connection to the database. It could be a new Sequelize with JAWSBD_URL or just a new Sequelize with out login from the .env file
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
      host: 'localhost', // host is our own machine
      dialect: 'mysql',  // mysql database
      port: 3306         // port
    }
  );
}

module.exports = sequelize;
