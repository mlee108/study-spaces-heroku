const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport')
const config = require('../config');
const router = express.Router();
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
var cors_proxy = require('cors-anywhere');

const app = express();
const PORT = process.env.PORT || 5000;
// const CORSPORT = process.env.PORT || 8081;
// const HOST = process.env.HOST || '0.0.0.0';
//
// cors_proxy.createServer({
//   originWhitelist: [],
//   requireHeader: ['origin', 'x-requested-with'],
//   removeHeaders: ['cookie', 'cookie2']
// }).listen(CORSPORT, HOST, function() {
//   console.log('Running CORS anywhere on' + HOST + ': ' + CORSPORT);
// })

// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};
app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

require('./models').connect(config.dbUri);
require('./auth/passport')(passport);

// Initialize cookie sessions
app.use(cookieParser());
app.use(cookieSession({
  keys: ['asdf', 'asdf']
}));

// Initialize Passport
app.use(passport.initialize()); // Create an instance of Passport
app.use(passport.session());

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Answer API requests.
app.use('/api', require('./routes/api.js')(router, passport));

// function (req, res) {
//   res.set('Content-Type', 'application/json');
//   res.send('{"message":"Hello from the custom server!"}');
// });

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
