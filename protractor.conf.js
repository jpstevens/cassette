(function () {

  'use strict';

  var config;

  config = {
    specs: [
      './tests/e2e/**/*-spec.js',
      './tests/e2e/*-spec.js'
    ],
    capabilities: {
      browserName: 'chrome',
      name: 'Protractor Tests'
    },
    baseUrl: 'http://localhost:' + (process.env.PORT || 9199)
  };

  if (process.env.TRAVIS) {
    config.sauceUser = process.env.SAUCE_USERNAME;
    config.sauceKey = process.env.SAUCE_ACCESS_KEY;
    config.capabilities['tunnel-identifier'] = process.env.TRAVIS_JOB_NUMBER;
    config.capabilities.build = process.env.TRAVIS_BUILD_NUMBER;
  }

  exports.config = config;
}());
