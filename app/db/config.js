// Databse setup
const dbHost = (process.env.DB_PORT || 'localhost');
const rethinkdb = {
  host: dbHost,
  port: 28015,
  authKey: '',
  db: 'Chatson',
};

const thinky = require('thinky')(rethinkdb);

module.exports.r = thinky.r;
module.exports.type = thinky.type;
module.exports.thinky = thinky;
