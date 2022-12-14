// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const {  getUserDetails } = require('./helpers');


const PORT = process.env.PORT || 8080;
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const orderApiRoutes = require('./routes/order-api');
const widgetApiRoutes = require('./routes/widgets-api');
const foodApiRoutes = require('./routes/food-api');
const usersRoutes = require('./routes/users');
const orderDetailRoutes = require('./routes/orderdetail');
const foodmenuRoutes = require('./routes/foodmenu');
const { getUsers } = require('./db/queries/users');
const adminRoutes = require('./routes/admin');
const adminApiRoutes = require('./routes/admin-api');
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/testfoods', foodmenuRoutes);
app.use('/api/orders', orderApiRoutes);
app.use('/api/foods', foodApiRoutes);
app.use('/api/admin', adminApiRoutes);
app.use('/order/detail', orderDetailRoutes)

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
// function getCookie(name) {
//   const value =
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();

// }

app.get('/', async (req, res) => {
  const users = await getUsers(); // users objects
  const userId = req.cookies.user_id; // id from cookie
  const type = getUserDetails(users, userId)
  console.log("type",type)
  const templateVars = {
    type
  }
  if(type === 'admin'){
    res.render('admin',templateVars)
  }
  else {
    res.render('index', templateVars);
  }
});



app.get('/login/:userId', (req, res) => {
  console.log(req.params.userId);
  res.cookie('user_id', req.params.userId);
  res.redirect('/');
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

process.on('SIGINT', function () {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  // some other closing procedures go here
  process.exit(0);
});
