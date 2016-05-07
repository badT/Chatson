const expect = require('expect');
const analyzer = require('../watson/analyzer.js');

describe('analyzer test suite', () => {
  // console.log(routes.app.post)
  it('should expose a function', () => {
    expect(analyzer.runAnalysis).toBeA('function');
  });

  it('should return tone analysis data', () => {
    const message = { text: 'testing you watson' };

    return analyzer.runAnalysis(message)
    .then((data) => {
      expect(data).toIncludeKey('toneData');
    });
  });

  it('should return an error when no text is sent', () => {
    const message = { text: '' };

    return analyzer.runAnalysis(message)
    .then((data) => {
      expect(data.toneData).toNotExist();
    }).catch((err) => {
      expect(err).toExist();
    });
  });

  describe('calling runAnalysis', () => {

    beforeEach(() => {
      expect.spyOn(analyzer, 'runAnalysis');
    });

    afterEach(() => {
      expect.restoreSpies();
    });

    it('should be called', (done) => {
      analyzer.runAnalysis();
      expect(analyzer.runAnalysis).toHaveBeenCalled();
      done();
    });

  });
});
