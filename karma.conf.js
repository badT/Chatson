var webpackConfig = require('./webpack/common.config.js');
webpackConfig.entry = {};
webpackConfig.devtool = 'inline-source-map';
webpackConfig.externals = {
  'cheerio': 'window',
};

module.exports = (config) => {
  config.set({
    basePath: 'src',
    singleRun: true,
    frameworks: ['mocha'],
    reporters: ['dots'],
    browsers: ['Chrome'],
    files: [
      'test/**/*.spec.js',
    ],
    preprocessors: {
      'test/**/*.spec.js': ['webpack', 'sourcemap'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: {
        color: true,
        chunkModules: false,
        modules: false,
      },
    },
  });
};
