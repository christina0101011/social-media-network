var mongoose = require('mongoose');
var User = mongoose.model('User');
var ChatConversation = mongoose.model('ChatConversation');
var ChatMessage = mongoose.model('ChatMessage');
var passport = require('passport/lib');

module.exports.wsConnection = app => { 
  app.ws('/echo', (ws, req) => {
    ws.on('message', _msg => { 
      console.log(JSON.parse(_msg));
      var msg = JSON.parse(_msg);
      const chatMessage = new ChatMessage();
      chatMessage.user = msg.user;
      chatMessage.content = msg.message;
      // console.log(777, chatMessage)
      chatMessage.save((err) => {
        if (err) {
          // console.log({ success: false, message: err });
          res.status(500).send({ "Error" : err.message });
          res.json({ success: false, message: err });
        } else {
          ws.send(_msg)
        }
      });
    })

    ws.on('close', () => {
        console.log('WebSocket was closed')
    })
  })
}

module.exports.getAvailableUsers = (req, res) => {
  if (!req.payload._id) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  } else {
    User
      .find({}).exec().then( users => {
        // console.log(users)
        var userDetails = [];
          users.forEach(user => {
            userDetails.push({_id: user._id, first_name: user.first_name, last_name: user.last_name, avatar: user.avatar})
            return userDetails
          });    
          // console.log(userDetails)
          res.send(userDetails)
      }
    )
    .catch(err => res.send(err));
  }
}