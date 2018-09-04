const multer = require('multer');
const Photos = require('./models/Photos');
const Blog = require('./models/Blog');
const User = require('./models/User');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,  __dirname + '/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, generateFileName(file));
  }
});

const upload = multer({
  storage: storage
}).array('file');

function generateFileName(file) {
  const fileFormat = (file.originalname).split('.');
  return fileFormat[0] + '-' + (Date.now() + '').slice(0, '-5') + '.' + fileFormat[fileFormat.length - 1]
}

function uploadFiles(req, res) {
  return new Promise((resolve, reject) => {
    upload(req, res, err => {
      if (err) {
        console.log(err);
        reject(err);
      }

      const respArr = [];
      req.files.forEach(file => {
        respArr.push(file.filename);
      });
      resolve(respArr);
    })
  });
}

module.exports.files = (req, res) => {
  return uploadFiles(req, res).then(img => {
    res.send(img);
  }).catch(err => res.status(500).send({
    error: err
  }));
}

module.exports.getFile = (req, res) => {
  var options = {
    root: __dirname + '/uploads/',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };

  var fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
    }
  });
}