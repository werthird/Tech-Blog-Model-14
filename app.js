// Requirements
  // Path - allows the file paths to be platform independent; it changes Windows file paths to resemble Apple by changing the \ to //
const path = require('path');

  // Express - imports express so that we can make api routes
const express = require('express');

  // Express Session - imports sessions so we can track a user across the web application and show certian data if they are logged in
const session = require('express-session');

  // Express Handlebars - allows the use of modulizing the view
const exphbs = require('express-handlebars');

// File Requirements
  // Allows us to have our routes in a seperate folder, and them import them into the server, which handles all api routes
const routes = require('./controllers');

// const helpers = require('./utils/helpers');

// Connects to a seperate file that connects us to the database
const sequelize = require('./config/connection');
// 
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Starts express
const app = express();
// Defines the port
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening to port ${PORT}`));
});
