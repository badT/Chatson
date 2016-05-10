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
      'test/**/*.spec.js': ['webpack'],
    },
    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['', '.js', '.ts'],
        modulesDirectories: ['node_modules', 'src'],
      },
      module: {
        loaders: [{
          test: /\.js$/,
          exclude: /\/node_modules\//,
          loader: 'babel-loader',
        }],
      },
      externals: {
        'cheerio': 'window',
        'react-dom': true,
        'react-dom/server': true,
        'react-addons-test-utils': true,
      },
    },
    webpackMiddleware: {
      stats: {
        color: true,
        chunkModules: false,
        modules: false,
      },
    },
  });
};
