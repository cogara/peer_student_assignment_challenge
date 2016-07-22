var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var index = require('./routes/index.js');
var assignment = require('./routes/assignment.js');

var app = express();

var mongoURI = "mongodb://localhost:27017/assignments";
var MongoDB = mongoose.connect(mongoURI).connection;

//static
app.use(bodyParser.json());
app.use(express.static('public'));

//routes
app.use('/', index);
app.use('/assignment', assignment);

MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open!');
});

var server = app.listen(3000, function() {
  var port = server.address().port;
  console.log('Listening on port', port);
})
