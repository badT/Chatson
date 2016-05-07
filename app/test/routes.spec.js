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

  it('should respond to POST requests', (done) => {
    server
    .post('/api/channels/subscribe')
    .send('nl_kripp')
    .end((err, res) => {
      expect(res.body).toEqual({ channel: 'nl_kripp' });
      done();
    });
  });

  it('should respond to PUT requests', (done) => {
    server
      .put('/api/watson/tone')
      .send('testing for hate')
      .end((err, res) => {
        expect(res.body).toExist();
        done();
      });
  });

  it('should return tone data from PUT requests', (done) => {
    server
      .put('/api/watson/tone')
      .send('testing for hate')
      .end((err, res) => {
        expect(res.body.toneData).toExist();
        done();
      });
  });

});
