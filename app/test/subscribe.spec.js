const expect = require('expect');
const routes = require('../routes.js');
const supertest = require('supertest');

const server = supertest.agent('http://localhost:3000');

describe('test suite', () => {
  // console.log(routes.app.post)
  it('should expose a function', () => {
    expect(routes).toExist('function');
  });

  it('should respond to POST requests', (done) => {
    server
      .post('/api/channels/subscribe')
      .send('nl_kripp')
      .end((err, res) => {
        expect(res.body).toEqual({ channel: 'nl_kripp' });
        done();
      });
  });
});
