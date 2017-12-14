/**
 * Created by SLEEK on 11/30/2017.
 */
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const router = require("./src/config/contact-list/router");
const routerHistory = require("./src/config/call-history/router");
const cors = require('cors');
// const webpackHotMiddleware = require('webpack-hot-middleware');
// const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const webpack = require('webpack');
const webpackconfig = require('./webpack.config.js');
const webpackMiddleware = require("webpack-dev-middleware");
const compiler = webpack(webpackconfig);

const port = process.env.PORT || 5000;

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
    serverSideRender: true,
}));


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