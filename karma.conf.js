(function () {

  'use strict';

  module.exports = function (config) {

    config.set({
      basePath: '.',
      files: [
        './bower_components/angular/angular.js',
        './bower_components/angular-mocks/angular-mocks.js',
        './src/scripts/**/*.js',
        './tests/unit/**/*-spec.js'
      ],
      autoWatch: true,
      autoWatchBatchDelay: 1000,
      runnerPort: 9999,
      frameworks: ['jasmine'],
      browsers: ['PhantomJS'],
      plugins: [
        'karma-jasmine',
        'karma-phantomjs-launcher'
      ]
    });
  };

}());
