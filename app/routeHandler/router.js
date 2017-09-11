'use strict';

let example = require('./routes/example.js');

module.exports = function(app){
  app.get('/example', example.welcome);
};
