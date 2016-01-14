var express = require("express");
var Habitat = require('habitat');
var bodyParser = require('body-parser');
var compression = require('compression');
var RateLimit = require('express-rate-limit');

Habitat.load();

var app = express();
var env = new Habitat();
var port = env.get('PORT');

app.enable('trust proxy');

var limiter = RateLimit({
  windowMs: 60 * 1000,
  delayMs: 1000,
  max: 5,
  global: false
});

app.configure(function() {
  app.use(compression());
  app.use(express.static(__dirname + '/public', {maxAge: 3600000}));
  app.use(bodyParser.json());
  app.use(function(err, req, res, next) {
    res.send(err);
  });
});

app.listen(port, function() {
  console.log("Running ( http://localhost:" + port + "/ )");
  console.log("Press Ctrl+C to stop");
});
