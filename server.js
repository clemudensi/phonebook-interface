/**
 * Created by SLEEK on 11/30/2017.
 */
var express = require('express');
var app = express();
var bodyParser = require ("body-parser");
var morgan = require("morgan");
var mongoose = require ("mongoose");
var router = require ("./src/config/contact-list/router");
var routerHistory = require("./src/config/call-history/router");
var cors = require('cors');
var config      = require('./src/config/contact-list/database');
var configHistory = require("./src/config/call-history/database");
const webpack = require('webpack');
const webpackconfig = require('./webpack.config.js');
const webpackMiddleware = require("webpack-dev-middleware");
const compiler = webpack(webpackconfig);
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/call-history', ['histories']);

var port = process.env.PORT || 5000;

app.use(webpackMiddleware(compiler, {
    noInfo: false,
    quiet: false,
    lazy: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    publicPath: "/assets/",
    index: "index.html",
    headers: { "X-Custom-Header": "yes" },
    stats: {
        colors: true
    },
    reporter: null,
    serverSideRender: false,
}));

mongoose.connect(config.database);
mongoose.connect(configHistory.database);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
// Logger that outputs all requests into the console
app.use(morgan('dev'));
// Use v1 as prefix for all API endpoints
app.use('/v1', routerHistory, router);
app.listen(port, function(){
    console.log('App is running on port 5000');
});