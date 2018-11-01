var mongoose = require('mongoose');
var User = mongoose.model('User');
var ChatConversation = mongoose.model('ChatConversation');
var ChatMessage = mongoose.model('ChatMessage');
var passport = require('passport/lib');

module.exports.wsConnection = app => {
  app.ws('/echo', (ws) => {
      ws.on('message', _msg => {
        const msg = JSON.parse(_msg);
        const chatMessage = new ChatMessage();

        chatMessage.sentFrom = msg.sentFrom;
        chatMessage.sentTo.push(msg.sentTo);
        chatMessage.content = msg.content;

        chatMessage
          .save()
          .then(message => {
            console.log(8888, message)
            if (message.conversation) {
              
              updateConversation(message.conversation, message._id)
            } else {
              createConversation(message) 
            }
            
            // msg.conversation ? updateConversation(msg.conversation, message._id) : createConversation(message) 
          return message
        })
          .then(respons => ws.send(JSON.stringify(respons)));
      });
    })
  }

  function updateConversation(conversationId, messageId) {
    console.log(8888, conversationId, messageId)
    return new Promise((resolve, reject) => {
      ChatConversation
        .findById(conversationId)
        .exec()
        .then(conversation => {
          
          conversation.messages.push(messageId);
          return conversation.save();
        }).then(conversation => {
          console.log(8888, conversation)
          resolve(conversation)
          console.log(3333, conversation)
        })
        .catch(err => reject(err));
    });
  }


  function createConversation(message) {
    return new Promise((resolve, reject) => {
      const conversation = new ChatConversation();
      conversation.sentFrom = message.sentFrom;
      conversation.sentTo = message.sentTo;
      conversation.massage = [message._id];
      // console.log(88888, chatConversation)
      conversation.save()
        // .exec()
        .then(conversation => resolve(conversation))
        .catch(err => reject(err));
    });
  }

// module.exports.wsConnection = app => {
//   app.ws('/echo', (ws, req) => {
//     ws.on('message', _msg => {
//       var msg = JSON.parse(_msg);
//       const chatMessage = new ChatMessage();
//       chatMessage.sentFrom = msg.sentFrom;
//       chatMessage.sentTo = msg.sentTo;
//       chatMessage.content = msg.content;
//       // chatMessage.conversation = msg.conversation || null;
//       chatMessage
//       .save()
//       .then(_chatMessage => {
//         console.log(123456, _chatMessage)
//         if () {
//           newConversation(_chatMessage)          
//           .exec()
//           .then(conversationHistory => {
//             console.log(conversationHistory)
//             ws.send(JSON.stringify(conversationHistory))
//           })
//           // } else {
//           updateConversation(_chatMessage)
//           // .exec()
//           // .then(conversationHistory => {
//           //   console.log(9999999999, conversationHistory)
//           //   ws.send(JSON.stringify(conversationHistory))
//           // })
//         // }
//       })
//     })
//     ws.on('close', () => {
//         console.log('WebSocket was closed')
//     })
//   })
// }

// function updateConversation (_chatMessage){
//   ChatConversation
//   .find({sentFrom: _chatMessage.sentFrom, sentTo: _chatMessage.sentTo})
//   .exec()
//   .then( conversationHistory => {
//     // conversationHistory.push(_chatMessage)
//     // return ChatConversation.save({_chatMessage})
//     return conversationHistory
//   })
// }

// // module.exports.updateConversation = updateConversation

module.exports.getAvailableUsers = (req, res) => {
  if (!req.payload._id) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  } else {
    User
      .find({}).exec().then( users => {
        var usersDetails = [];
          users.forEach(user => {
            usersDetails.push({_id: user._id, first_name: user.first_name, last_name: user.last_name, avatar: user.avatar})
            return usersDetails
          });
          res.send(usersDetails)
      }
    )
    .catch(err => res.send(err));
  }
}

function getConversation (req, res){
  ChatConversation
  .find({sentFrom: req.payload._id, sentTo: req.params._id})
  .exec()
  .then( conversationHistory => {
    // console.log(8999, conversationHistory)
    res.send(conversationHistory)
  })
  .catch(err => {
      console.log(err);
      res.send(err)
    })
}
module.exports.getConversation = getConversation

// function newConversation (chatMessage) {
//   chatConversation = new ChatConversation();
//   chatConversation.sentFrom = chatMessage.sentFrom;
//   chatConversation.sentTo = chatMessage.sentTo;
//   chatConversation.massage.push(chatMessage._id);
//   // console.log(88888, chatConversation)
//   return chatConversation.save()
// }
// module.exports.newConversation = newConversation