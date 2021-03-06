var Webpack = require('webpack'),
    banner = require('./utils/banner');

var LIB_NAME = 'react-drive-in';
var GLOBAL_VAR = 'ReactDriveIn';

module.exports = {
    entry: './lib/' + LIB_NAME + '.jsx',
    devtool: (process.env.NODE_ENV === 'development') ? 'source-map' : null,
    output: {
        path: __dirname + '/dist',
        filename: LIB_NAME + '.js',
        libraryTarget: 'umd',
        library: GLOBAL_VAR
    },
    externals: {
        react: {
            root: 'React',
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react'
        }
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            loader: 'jsx-loader?harmony'
        }, {
            test: /\.(js|jsx)$/,
            loader: 'jsx-loader?insertPragma=React.DOM'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        packageAlias: 'browser'
    },
    plugins: [
        new Webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
            }
        }),
        new Webpack.BannerPlugin(banner, {
            raw: true,
            entryOnly: true
        })
    ]
};
