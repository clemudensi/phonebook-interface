/**
 * Created by SLEEK on 11/30/2017.
 */
var express = require('express');
var app = express();
var bodyParser = require ("body-parser");
var morgan = require("morgan");
var mongoose = require ("mongoose");
var router = require ("./src/config/router");
var config      = require('./src/config/database');

var port = process.env.PORT || 5000;

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(config.database);

// Logger that outputs all requests into the console
app.use(morgan('dev'));
// Use v1 as prefix for all API endpoints
app.use('/v1', router);

app.listen(port, function(){
    console.log('App is running on port 5000');
});