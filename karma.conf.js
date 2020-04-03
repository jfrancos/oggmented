// Karma configuration
// Generated on Sun Mar 29 2020 22:46:15 GMT+0000 (Coordinated Universal Time)


module.exports = (config) => {
  config.set({
    // ... normal karma configuration
    basePath: './',
    files: [
      {pattern: 'test/silence.*', included: false, watched: false, served:true},
      {pattern: 'test/test.js', included: true, watched: false, nocache: false }, // is it weird that tests fail with nocache:true?
      // {pattern: 'test/index.html', watched: false},
      {pattern: 'dist/*.js', included: false, watched: false, served:false, nocache: true},
      // each file acts as entry point for the webpack configuration
    ],
    browsers: ['Safari', 'ChromeHeadless', 'Firefox'],// , 'Opera', 'Chrome', 'ChromeCanary'],'Safari', //'ChromeHeadless', 
    reporters: ['progress'],

    preprocessors: {
      // add webpack as preprocessor
      'test/*test.js': ['webpack'],
      // 'test/**/*test.js': ['webpack'],
    },
    frameworks: ['mocha'],
    webpack: {
      // karma watches the test entry points
      // (you don't need to specify the entry option)
      // webpack watches dependencies
      // webpack configuration
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      // stats: 'errors-only',
    },
  });
};


// module.exports = function(config) {
//   config.set({

//     // base path that will be used to resolve all patterns (eg. files, exclude)
//     basePath: '',


//     // frameworks to use
//     // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
//     frameworks: ['mocha'],


//     // list of files / patterns to load in the browser
//     files: [ 'test/test.js'
//     ],


//     // list of files / patterns to exclude
//     exclude: [
//     ],


//     // preprocess matching files before serving them to the browser
//     // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
//     preprocessors: {
//       'test/*_test.js': ['webpack'],
//       'test/**/*_test.js': ['webpack'],
//     },


//     // test results reporter to use
//     // possible values: 'dots', 'progress'
//     // available reporters: https://npmjs.org/browse/keyword/karma-reporter
//     reporters: ['progress'],


//     // web server port
//     port: 9876,


//     // enable / disable colors in the output (reporters and logs)
//     colors: true,


//     // level of logging
//     // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
//     logLevel: config.LOG_INFO,


//     // enable / disable watching file and executing tests whenever any file changes
//     autoWatch: true,


//     // start these browsers
//     // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
//     browsers: ['Safari', 'ChromeHeadless', 'Firefox', 'Opera', 'Chrome', 'ChromeCanary'],


//     // Continuous Integration mode
//     // if true, Karma captures browsers, runs the tests and exits
//     singleRun: false,

//     // Concurrency level
//     // how many browser should be started simultaneous
//     concurrency: Infinity
//   })
// }
