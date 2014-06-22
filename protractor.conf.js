(function () {

    'use strict';

    exports.config = {
        allScriptsTimeout: 10000,
        specs: [
            './tests/e2e/**/*-spec.js',
            './tests/e2e/*-spec.js'
        ],
        capabilities: {
            browserName: 'chrome'
        }
    };
}());
