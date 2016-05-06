const expect = require('expect');
const routes = require('../routes.js');
const supertest = require('supertest');

const server = supertest.agent('http://localhost:3000');

describe('routes test suite', () => {
  // console.log(routes.app.post)
  it('should expose functions', () => {
    expect(routes).toBeA('function');
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
