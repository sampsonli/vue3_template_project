const webpack = require('webpack');
const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');

const dllPath = path.resolve(__dirname, '../public/dll');
module.exports = {
    mode: 'production',
    entry: {
        /**
         * 不能包含vue 相关的库， 特别是包含组合api的库， 不然会引发莫名其妙的bug
         */
        vendors: [
            'dayjs',
            'axios',
        ],
    },

    output: {
        publicPath: '/dll',
        filename: '[name].[chunkhash:8].dll.js',
        path: dllPath,
        library: '[name]_lib',
    },
    target: ['web', 'es5'],
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(dllPath, '[name]-manifest.json'),
            name: '[name]_lib',
        }),
        new AssetsPlugin({
            filename: 'bundle-config.json',
            path: dllPath,
        }),
    ],
};
