exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './tests/e2e/**/*-spec.js',
    './tests/e2e/*-spec.js'
  ],
  capabilities: {
    browserName: 'chrome'
  }
};
