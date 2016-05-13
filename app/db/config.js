// Databse setup
// TODO Need to update this for local environment.

const rethinkdb = {
  host: 'localhost',
  port: 28015,
  authKey: '',
  db: 'Chatson',
};

const thinky = require('thinky')(rethinkdb);

module.exports.r = thinky.r;
module.exports.type = thinky.type;
module.exports.thinky = thinky;
