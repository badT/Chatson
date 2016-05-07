const expect = require('expect');
const analyzer = require('../watson/analyzer.js');

describe('analyzer test suite', () => {
  // console.log(routes.app.post)
  it('should expose a function', () => {
    expect(analyzer.runAnalysis).toBeA('function');
  });
  describe('calling runAnalysis', () => {

    beforeEach(() => {
      expect.spyOn(analyzer, 'runAnalysis');
    });

    afterEach(() => {
      expect.restoreSpies();
    });

    it('is called', (done) => {
      analyzer.runAnalysis();
      expect(analyzer.runAnalysis).toHaveBeenCalled();
      done();
    });
  });
});
