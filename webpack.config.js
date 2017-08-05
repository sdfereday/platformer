const path = require('path');
const webpack = require('webpack');

// Phaser webpack config - Need to work out how to optimise (exclude p2, etc)
let phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');

// https://github.com/lean/phaser-es6-webpack
// http://rroylance.github.io/phaser-npm-webpack-typescript-starter-project/
// https://www.npmjs.com/package/phaser
module.exports = {
    watch: true,
    entry: {
        app: [
            path.resolve(__dirname, './src/main.js')
        ],
        vendor: ['pixi', 'p2', 'phaser']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'game.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        alias: {
            // https://github.com/webpack/webpack/issues/4666
            'phaser': path.join(phaserModule, 'build/custom/phaser-split.js'),
            'pixi': path.join(phaserModule, 'build/custom/pixi.js'),
            'p2': path.join(phaserModule, 'build/custom/p2.js'),
        },
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ],
                include: path.resolve(__dirname, 'src'),
            },
            // https://github.com/photonstorm/phaser/issues/2762
            {
                test: /pixi\.js/,
                use: ['expose-loader?PIXI'],
            },
            {
                test: /phaser-split\.js$/,
                use: ['expose-loader?Phaser'],
            },
            {
                test: /p2\.js/,
                use: ['expose-loader?p2'],
            },
        ],
    },
    plugins: [
        // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // new webpack.optimize.UglifyJsPlugin({
        //     drop_console: false,
        //     minimize: true,
        //     output: {
        //         comments: false
        //     }
        // }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor'/* chunkName= */, filename: 'vendor.bundle.js'/* filename= */ })
    ]
};