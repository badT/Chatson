const expect = require('expect');
const analyzer = require('../watson/analyzer.js');

describe('analyzer test suite', () => {
  // console.log(routes.app.post)
  it('should expose a function', () => {
    expect(analyzer.intoTones).toBeA('function');
  });
  describe('calling intoTones', () => {

    beforeEach(() => {
      expect.spyOn(analyzer, 'intoTones');
    });

    afterEach(() => {
      expect.restoreSpies();
    });

    it('is called', (done) => {
      analyzer.intoTones();
      expect(analyzer.intoTones).toHaveBeenCalled();
      done();
    });
  });
});
