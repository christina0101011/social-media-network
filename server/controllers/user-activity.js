var mongoose = require('mongoose');
var User = mongoose.model('User');
var ChatConversation = mongoose.model('ChatConversation');
var ChatMessage = mongoose.model('ChatMessage');
var passport = require('passport/lib');

module.exports.wsConnection = app => { 
  app.ws('/echo', (ws, req) => {
    ws.on('message', _msg => { 
      console.log(JSON.parse(_msg));
      const msg = JSON.parse(_msg);
      const chatMessage = new ChatMessage();
      // chatMessage.user = msg.user;
      chatMessage.content = msg.message;
      console.log(777, chatMessage)
      chatMessage.save((err) => {
        if (err) {
          console.log({ success: false, message: err });
          res.status(500).send({ "Error" : err.message });
          res.json({ success: false, message: err });
        } else {
          // const _chatMessage = JSON.stringify(chatMessage);
          // console.log(22222, _chatMessage);
          ws.send(_msg)
        }
      });
    })

    ws.on('close', () => {
        console.log('WebSocket was closed')
    })
})

}