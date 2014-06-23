(function () {

  'use strict';

  var express, app;

  express = require('express');
  app = express();

  app.engine('.html', require('ejs').__express);
  app.set('views', __dirname);
  app.set('view engine', 'html');

  /*jslint unparam: true*/

  app.get('/', function (req, res) {
    res.render('index', {
      pkg: require('../package.json'),
      component: require('../bower.json')
    });
  });

  /*jslint unparam: false*/

  module.exports = app;

}());
