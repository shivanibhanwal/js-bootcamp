const path = require('path')
module.exports = {
    entry:{
        index: ['babel-polyfill','./src/index.js'],
        edit: ['babel-polyfill','./src/edit.js']
    },
    output: {
        path: path.resolve(__dirname, 'public/scripts'),
        filename: '[name]-bundle.js',
        clean: true
    },
   
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-proposal-object-rest-spread']
                }
            }
        }]
    },
    devServer: {
        static: { directory: path.resolve(__dirname, 'public')   },
        devMiddleware: {publicPath: "/scripts/"}
    },
    devtool: 'source-map',
}