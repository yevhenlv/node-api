require('@babel/register')({
  presets: [ '@babel/preset-env' ],
  plugins: [ '@babel/plugin-transform-runtime' ]
});

var cors = require('cors');
var path = require('path');
var routes = require('./routes');
var createError = require('http-errors');
var express = require('express');
var httpLogger = require('morgan');
var mongoose = require('./libs/mongoose');

var app = express();

/* basic modules */
app.use(httpLogger('dev'));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'api')));

app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/* imported modules */
mongoose.connect(process.env.NODE_ENV === 'test' ? 'mongodb://localhost:27017/texts-test' : 'mongodb://localhost:27017/texts');
routes(app);

/* errors handlers */
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {  
  if (err.code) {
    res.status(err.code).send(err);
  } else {
    res.status(err.status || 500);
  } 
});

app.listen(3001)