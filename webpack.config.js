const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'src', 'index'),
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: path.join(__dirname, 'dist'),
        filename: "bundle.js",
        chunkFilename: '[name].js'
    },
    module: {
        rules: [{
                test: /.jsx?$/,
                include: [
                    path.resolve(__dirname, 'app')
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.css$/, // 匹配 css 文件
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js?$/, // 匹配 js 或 jsx 文件
                exclude: /node_modules/, // 排除 node_modules 文件夹
                use: {
                  loader: 'babel-loader',
                  options: {
                    // babel 转义的配置选项
                    babelrc: false,
                    presets: [
                      [require.resolve('@babel/preset-env'), {modules: false}]
                    ],
                    cacheDirectory: true
                  }
                }
              }
            
        ]
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx']
    },
     // 配置插件
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html'),
            filename: 'index.html',
            inject: true
        })
    ],
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, '/dist/'),
        inline: true,
        host: 'localhost',
        port: 8000,
    }
};