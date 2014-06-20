module.exports = function(config) {
  config.set({
    basePath: '.',
    files: [
      './bower_components/angular/angular.js',
      './bower_components/angular-mocks/angular-mocks.js',
      './src/**/*.js',
      './tests/unit/**/*-spec.js'
    ],
    autoWatch: true,
    autoWatchBatchDelay: 1000,
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher'
    ]
  });
};
