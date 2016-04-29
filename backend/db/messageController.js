const Message = require('./messageSchema');

exports.saveMessage = (message) => {
  const newMessage = new Message(message);
  newMessage.save().then((result) => {
    console.log(result);
  }).error((res) => {
    console.log(res);
  });
};

exports.getMessages = () => {
  Message.run().then((posts) => {
    console.log(posts.length);
  });
};
