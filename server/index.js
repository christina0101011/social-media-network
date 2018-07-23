const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const router = require('./api');
const cookieParser = require('cookie-parser');
require('./db');
require('./config/passport');

const port = process.env.PORT || 3000;
const app = express();

app.use(logger('dev'));
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());
app.use(router);

// [SH] Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.first_name === 'UnauthorizedError') {
    res.status(401);
    res.json({
      "message": err.first_name + ": " + err.message
    });
    next(err);
  }
});

app.listen(port, () => console.log('server started at port: ' + port));
