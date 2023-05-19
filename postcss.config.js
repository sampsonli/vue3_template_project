/** postcss-loader 解析器所需的配置文件 * */
const autoprefixer = require('autoprefixer');

// const pxtorem = require('postcss-pxtorem');

module.exports = {
    plugins: [
      autoprefixer,
        // pxtorem({
        //     replace: true,
        //     propList: ['*'],
        //     rootValue: 100,
        // }),
    ],
};
