const express = require('express');
const Models = require('./models/Models');
const crypto = require('crypto');
const jwt = require('express-jwt');
const auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

const ctrlProfile = require('./controllers/profile');
const ctrlAuth = require('./controllers/authentication');

const router = express.Router(); /** Initializing Routes instance **/

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;