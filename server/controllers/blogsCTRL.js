const passport = require('passport/lib');
const mongoose = require('mongoose');
// const Blog = require('../models/Blog');
const Blog = require('../models/Blog-model');
const User = mongoose.model('User');

// GET blogs listing
module.exports.blogsList = (req, res, next) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log(err);
      res.send(err, { error: 'Fetching failed!' })
    } else {
      res.send(blogs);
      next();
    }
  });
}

// Post new blog
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

// Delete blog
module.exports.deleteBlog = (req, res) => {
  Blog.findByIdAndRemove(req.params.id, err => {
    if(err){
      console.log(err);
      res.send(err);
    } else {
      res.send({ data : "Blog has been Deleted..!!" });
    }
  });
}

//Update Blog
module.exports.updateBlog = (req, res, next) => {
  Blog.findByIdAndUpdate(req.params.id,
    {description: req.body.description,
    url: req.body.url,
    gallery: req.body.contentUrlArr,
    theme: req.body.theme}, 
    (err, blog) => {

      console.log(err);
      console.log(blog);

    if (err) {
      res.send(err);
      return next(err);
    } else {
      res.send({ data : "Blog has been Updated..!!" });  
    }
  }
);
// console.log(req.params.id)
}