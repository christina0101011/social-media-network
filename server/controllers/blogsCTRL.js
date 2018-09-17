const passport = require('passport/lib');
const mongoose = require('mongoose');
const Blog = require('../models/Blog');
const BlogType = require('../models/BlogType');
const Comments = require('../models/Comments');
const Description = require('../models/Description');
const Likes = require('../models/Likes');
const Photos = require('../models/Photos');
const Theme = require('../models/Theme');
var User = mongoose.model('User');
const srvUpload = require('../uploading-files.service');
const profile = require('./profile');

const themes = [
  {_id: '41224d776a326fb40f000001', title: 'Wish', themeDescription: 'made a'},
  {_id: '41224d776a326fb40f000002', title: 'Contribution', themeDescription: 'made a'},
  {_id: '41224d776a326fb40f000003', title: 'Vibe', themeDescription: 'wrote a'},
  {_id: '41224d776a326fb40f000004', title: 'Dream Box', themeDescription: 'updated'}
];

// GET blogs listing
module.exports.blogsList = (req, res, next) => {
  let blogsArr = [];
  Blog.find({})
  .exec()

  .then(blogs => {
    return blogs.map(blog => {
      let fullTheme = {};
      themes.forEach(theme => {
        if (blog.theme == theme._id) {
          fullTheme = theme;
        }
      });
      return {
        _id: blog._id,
        photos: blog.photos,
        user: blog.user,
        likes: blog.likes,
        description: blog.description,
        url: blog.url,
        theme: fullTheme,
        comments: blog.comments,
        created_at: blog.created_at,
        updated_at: blog.created_at,
        __v: blog.__v
      }
    });
  })

  .then( blogs => {
    blogsArr = blogs;
    let usersArr = [];
    blogs.forEach(blog => {
      usersArr.push(blog.user);
    });
    return User.find({_id: {$in: usersArr }}).exec();
  })

  .then(usersArr => {
    blogsArr = blogsArr.map(blog => {
      usersArr.forEach(user => {
        if (user._id + '' == blog.user) {
          blog.user = user;
        }
      });
      return blog;
    });
    res.send(blogsArr);
  })
  .catch(err => res.send(err));
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
  blog.user = req.payload._id;
  blog.photos = req.body.photos || [];
  // blog.likes = req.payload._id;
  // blog.comments = req.payload._id;
  blog.description = req.body.description;
  blog.url = req.body.url;
  blog.theme = req.body.theme;
  // blog.type = req.blogType;
  blog.save((err) => {
    if (err) {
      console.log({ success: false, message: err });
      res.status(500).send({ "Error" : err.message });
      res.json({ success: false, message: err });
    } else {
      res.json({ success: true, message: 'blog created' });
      // console.log('req', req.body);
    }
  });
}

module.exports.getTheme = (req, res) => {
  res.send(themes);
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
    photos: req.body.photos,
    theme: req.body.theme,
    updated_at: req.body.updated_at
  }, 
    (err, blog) => {
      console.log(err);
      console.log('updateBlog: ', blog);
    if (err) {
      res.send(err);
      return next(err);
    } else {
      // console.log('req.body.photos: ', req.body.photos)
      res.send({ data : "Blog has been Updated..!!" });  
    }
  }
);
// console.log(req.params.id)
}