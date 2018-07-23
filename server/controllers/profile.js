var mongoose = require('mongoose');
var User = mongoose.model('User');

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
