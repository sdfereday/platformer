const path = require('path');
const webpack = require('webpack');

// Phaser webpack config - Need to work out how to optimise (exclude p2, etc)
let phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
let phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
let pixi = path.join(phaserModule, 'build/custom/pixi.js');
let p2 = path.join(phaserModule, 'build/custom/p2.js');

// https://github.com/lean/phaser-es6-webpack
let definePlugin = new webpack.DefinePlugin({
    'global': {},
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false'))
});

// http://rroylance.github.io/phaser-npm-webpack-typescript-starter-project/
// https://www.npmjs.com/package/phaser
module.exports = {
    target: 'node',
    node: {
        fs: 'empty'
    },
    entry: {
        app: [
            path.resolve(__dirname, './src/main.js')
        ],
        vendor: ['pixi', 'p2', 'phaser']
    },
    watch: true,
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        filename: 'game.js'
    },
    plugins: [
        definePlugin,
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.optimize.UglifyJsPlugin({
            drop_console: true,
            minimize: true,
            output: {
                comments: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor'/* chunkName= */, filename: 'vendor.bundle.js'/* filename= */ })
    ],
    module: {
        rules: [
            {
                test: /src\.js$/,
                exclude: /node_modules/,
                include: path.join(__dirname, 'src'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
            { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
            { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
            { test: /p2\.js/, use: ['expose-loader?p2'] }
        ]
    },
    resolve: {
        alias: {
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2
        }
    }
};