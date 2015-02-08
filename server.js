var express = require('express');

var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');

mongoose.connect('mongodb://localhost:27017/storage');

app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());


require('./app/config/passport')(passport);
app.use(passport.initialize());

require('./app/routes.js')(app, passport);

app.listen(8080);
console.log("App listening on port 8080");