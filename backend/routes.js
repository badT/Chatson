const messageController = require('./db/controllers/messageController');
const chatChannels = require('./utils/socketio');
const establishConnection = chatChannels.establishConnection();

establishConnection.connect('imaqtpie');

module.exports = (app, express) => {
  app.get('/messages', (req, res) => {
    messageController.getMessages((data) => {
      res.send(data);
      res.end();
    });
  });
  
  app.post('/api/channels/subscribe', (req, res) => {
    var data = '';

    req.on('data', function(chunk) {
      data += chunk;
    });

    req.on('end', () => {
      const channel = data.toString();
      
      // add the new channel to the list of connected channels, if it is not included already
      establishConnection.connect(channel);
      // send the channel name back to the client. client leaves current socket room and joins this one
      res.send({ channel });
      res.end();
    });

  });
};
