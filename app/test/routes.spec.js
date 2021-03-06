const expect = require('expect');
const routes = require('../routes.js');
const supertest = require('supertest');

const server = supertest.agent('http://localhost:3000');

describe('routes test suite', () => {
  it('should expose functions', () => {
    expect(routes).toBeA('function');
  });

  describe('POST request API handler', () => {
    it('should respond to POST requests', (done) => {
      server
        .post('/api/channels/subscribe')
        .send('nl_kripp')
        .end((err, res) => {
          expect(res.body).toEqual({ channel: 'nl_kripp' });
          done();
        });
    });

    it('should return an error for POST requests with no data', (done) => {
      server
      .post('/api/channels/subscribe')
      .send('')
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });

  describe('PUT request API handler', () => {
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

    it('should return an error for PUT requests with no data', (done) => {
      server
        .put('/api/watson/tone')
        .send('')
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });

  describe('GET request API handler', () => {
    it('should respond to GET requests', (done) => {
      server
        .get('/api/watson/toneData')
        .end((err, res) => {
          expect(res.body).toExist();
          done();
        });
    });

    it('should respond with tone data to GET requests', (done) => {
      server
        .get('/api/watson/toneData')
        .end((err, res) => {
          expect(res.body[0].channel).toExist();
          done();
        });
    });
  });

});
