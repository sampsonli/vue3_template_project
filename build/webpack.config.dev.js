const path = require("path");
const webpack = require('webpack');
const {VueLoaderPlugin} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const AutoImport = require('unplugin-auto-import/webpack').default;
const Components = require('unplugin-vue-components/webpack').default;
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
module.exports = {
    mode: "development",
    devServer: {
        // static: {
        //     directory: path.join(__dirname, '../public'),
        // },
        compress: true,
        port: 8816,
    },
    entry: {
        app: [
            path.resolve(__dirname, '../src/index.js'),
        ],
    },
    output: {
        path: path.resolve(__dirname, '../dist'), // 将文件打包到此目录下
        publicPath: '/', // 在生成的html中，文件的引入路径会相对于此地址，生成的css中，以及各类图片的URL都会相对于此地址
        filename: '[name].js',
        chunkFilename: '[name]_chunk.js',
        assetModuleFilename: 'assets/[hash][ext][query]',
    },
    devtool: 'inline-source-map', // 报错的时候在控制台输出哪一行报错
    context: path.resolve(__dirname, '../'),
    module: {
        rules: [
            {
                // .js .jsx用babel解析
                test: /\.[tj]s$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                    transpileOnly: true,
                }

            },
            {
                // .js .jsx用babel解析
                test: /\.vue$/,
                exclude: /node_modules/,
                use: [
                    'vue-loader',
                ],
            },
            {
                // .less 解析
                test: /\.(less|css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                type: 'asset',
            },
        ],
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, '../src'),
        },
        extensions: ['.js', '.vue', '.jsx', '.ts', '.json'],
    },
    plugins: [
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            '__VUE_OPTIONS_API__': true,
            '__VUE_PROD_DEVTOOLS__': false,
        }),
        new VueLoaderPlugin(),
        new CopyWebpackPlugin({patterns: [{from: path.resolve(__dirname, '../public')}]}),
        new HtmlWebpackPlugin({
            // 根据模板插入css/js等生成最终HTML
            filename: 'index.html', // 生成的html存放路径，相对于 output.path
            template: path.resolve(__dirname, '../src/index.ejs'), // html模板路径
            inject: true, // 是否将js放在body的末尾
            // favicon: path.join(ctxPath, 'static/favicon.ico'), // 自动把根目录下的favicon.ico图片加入html
            // dllName: isDll ? bundleConfig.vendors.js : null,
        }),
    ],
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all', // Taken from https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
            minSize: 0,
            maxAsyncRequests: Infinity,
            maxInitialRequests: Infinity,
            cacheGroups: {
                async: {
                    chunks: 'async',
                    minSize: 3000,
                    minChunks: 2,
                    maxAsyncRequests: 5,
                    maxInitialRequests: 3,
                    priority: -1,
                    reuseExistingChunk: true,
                },
                commons: {
                    name: 'commons',
                    chunks: 'all', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
                    reuseExistingChunk: true,
                    priority: 1,
                    minChunks: 1,
                    enforce: true,
                    test: /[\\/]node_modules[\\/](@babel|core-js|css-loader|style-loader|webpack-hot-middleware|ansi-html|html-entities|querystring)/,
                },

                vendors: {
                    name: 'vendors',
                    chunks: 'initial', // 必须三选一： "initial" | "all" | "async"(默认就是异步)
                    reuseExistingChunk: true,
                    priority: 0,
                    minChunks: 1,
                    enforce: true,
                    test: /[\\/]node_modules[\\/]/,
                },

            },
        },
    },

}