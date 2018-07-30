const passport = require('passport/lib');
const mongoose = require('mongoose');
const Blog = require('../models/Blog');
const User = mongoose.model('User');


// module.exports.blogsList = (req, res) => {
//   Blog.find({}, (err, blogs) => {
//     if (err) {
//       console.log(err);
//       res.send(err, { error: 'Fetching failed!' })
//     } else {
//       res.send(blogs);
//       next();
//     }
//   });
// }

module.exports.newBlog = (req, res) => {
  if (this.theme && this.theme !== 'Choose your theme'
  && (this.description.length >= 10 || this.description === '')
  && (this.url.match('^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$') || this.url === ''))
{
  res.status(422).send({"Error: unprocessable entity" : err.message});
}

  const blog = new Blog();

  blog.description = req.body.description;
  blog.url = req.body.url;
  blog.gallery = req.body.contentUrlArr || [];
  blog.theme = req.body.theme;

  blog.save((err) => {
    if (err) {
      console.log({ success: false, message: err });
      res.status(500).send({ "Error" : err.message });
      res.json({ success: false, message: err });
    } else {
      res.json({ success: true, message: 'blog created' });
    }
  });
}