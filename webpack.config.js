var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/public');
var APP_DIR = path.resolve(__dirname, 'src/app');

var config = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: [/\.js?/, /\.jsx?/],
                include: APP_DIR,
                loader: 'babel'
            }, {
                test: /\.json?/,
                loader: 'json'
            }
        ]
    },
    resolve: {
        extensions: ['', '.json', '.jsx', '.js']
    }
};

module.exports = config;