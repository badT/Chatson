const messageController = require('./db/controllers/messageController');
const chatChannels = require('./utils/channelConnection');
const establishConnection = chatChannels.establishConnection();
const analyzer = require('./watson/analyzer');

module.exports = (app, express) => {
  app.get('/messages', (req, res) => {
    messageController.getMessages((data) => {
      res.send(data);
    });
  });

  app.post('/api/channels/subscribe', (req, res) => {
    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      const channel = data.toString();
      // Checks to see if channel has a length then then creates a connection
      if (channel !== '') {
        // add the new channel to the list of connected channels, if it is not included already
        establishConnection.connect(channel);
        // send the channel name back to the client. client leaves current socket room and joins this one
        res.send({ channel });
      } else {
        res.status(400).send('No channel data recieved');
      }
    });
  });

  app.put('/api/watson/tone', (req, res) => {
    const data = { text: '' };

    req.on('data', (chunk) => {
      data.text += chunk;
    });

    req.on('end', () => {
      // Checks to see if data has a length then runs the analyzer
      if (data.text !== '') {
        analyzer.runAnalysis(data)
          .then((tone) => {
            res.send(tone);
          })
          .catch(err => {
            res.sendStatus(500);
          });
      // sends back error message if data is empty
      } else {
        res.status(400).send('No message data recieved');
      }
    });
  });

};
