/**
 * Created by SLEEK on 12/4/2017.
 */
const nodeExternals = require('webpack-node-externals');
const fs = require('fs');
const path = require('path');

module.exports = {
    entry: './server.js',
    target: 'node',
    context: __dirname,
    externals: [ nodeExternals() ],
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'server.js',
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader' },
            { test: /\.scss$/, loader: 'css/locals?module!sass' },
        ],
    },
};