var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport/lib');

module.exports.profileRead = (req, res) => {
  if (!req.payload._id) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec((err, user) => {
        err ? res.status(400).json(err) : res.status(200).json(user);
      });
  }
};

module.exports.profileUpdate = (req, res) => {
  console.log('payload: ', req.payload);
  if (!req.payload._id) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  } else {
    User
      .update({
          _id: req.payload._id
        },
        req.body).exec((err, user) => {
        err ? res.status(400).json(err) : res.status(200).json(user);
      });
  }
};

module.exports.updatePassword = (req, res) => {
  if (!req.payload._id) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
    } else {
      User.findById(req.payload._id)
      .exec((err, user) => {
        if (user.validPassword(req.body.prev_password)) {
          user.setPassword(req.body.new_password);
          user.save(function (err) {
            if (err) {
              res.status(500);
              res.send({
                error: err
              });
            } else {
              res.status(200).json({
                "message": "Password changed"
              });
            }
          });
        } else {
          res.status(401).json({
            "message": "Invalid password"
          });
        }
      });
    }
};

module.exports.deleteUser = (req, res) => {
  if (!req.payload._id) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  } else {
    User
    .update({
        _id: req.payload._id
      },
      {deleted: true}).exec((err, user) => {
      err ? res.status(400).json(err) : res.status(200).json(user);
    });
  }
};
