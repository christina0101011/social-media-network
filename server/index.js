const express = require('express');
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const logger = require ('morgan');

const bodyParser = require ('body-parser');
const router = require ('./api');

const port = process.env.PORT || 3000;
const app = express ();
app.use(logger('dev'));
app.use(function (req, res, next) {

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
app.use(bodyParser.json({limit: '50mb'}));
app.use(router);

// Add headers

mongoose.connect('mongodb://localhost:27017/smn_v1', err => {
  if (err) {
    console.log('no connection to db ' + err)
  } else {
    console.log('db connected!');
  }
});

app.listen (port, () => console.log('server started at port: ' + port));
