require('@babel/register')({
  presets: [ '@babel/preset-env' ],
  plugins: [ '@babel/plugin-transform-runtime' ]
});

var routes = require('./routes');
var createError = require('http-errors');
var express = require('express');
var httpLogger = require('morgan');
var log = require('./libs/log')(module);
var bodyParser = require('body-parser');
var mongoose = require('./libs/mongoose');

var app = express();

/* basic modules */
app.use(httpLogger('dev'));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/* imported modules */
mongoose.connect();
routes.set(app);

/* errors handlers */
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  log.error(err);

  if (err.code) {
    res.status(err.code).send(err);
  } else {
    res.status(err.status || 500);
  } 
});

module.exports = app;