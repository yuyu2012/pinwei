const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin'); //引入html-webpack-plugin
const CleanWebpackPlugin = require('clean-webpack-plugin'); //引入 

module.exports = {
    entry: {
        index: "./pinwei/index.js"
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: { // 抽离自己写的公共代码
                    chunks: "initial",
                    name: "common", // 打包后的文件名，任意命名
                    minChunks: 2, //最小引用2次
                    minSize: 0 // 只要超出0字节就生成一个新包
                },
                vendor: { // 抽离第三方插件
                    test: /node_modules/, // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor', // 打包后的文件名，任意命名
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10
                },
            }
        }
    },

    output: {
        filename: "[name].bundle.[hash].js", //[hash]会在后面生成随机hash值
        path: path.join(__dirname, "dist")

    },
    module: { // 处理对应模块
        rules: [{
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        // ignoreCustomFragments: [],
                        // root: path.resolve(__dirname, 'src'),
                        // attrs: ['img:src']
                    }
                }
            },
            {
                test: /\.(less|css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ],
                // include: [
                //     /src/,
                //     '/node_modules/swiper/dist/css'
                // ]
            },

            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        outputPath: './images', //输出到images文件夹
                        limit: 500, //是把小于500B的文件打成Base64的格式，写入JS
                        name: '[name].[ext]'
                    }
                }]
            },

            {
                test: /\.js$/,
                loader: 'babel-loader' //es6转es5
            }
        ],

    },

    plugins: [ // 对应的插件

        new HtmlWebpackPlugin({ //配置
            filename: 'index.html', //输出文件名
            template: './pinwei/index.html', //以当前目录下的index.html文件为模板生成dist/index.html文件
        }),
        new HtmlWebpackPlugin({ //配置
            filename: 'menu.html', //输出文件名
            template: './pinwei/menu.html', //以当前目录下的index.html文件为模板生成dist/index.html文件
        }),
        new HtmlWebpackPlugin({ //配置
            filename: 'contact.html', //输出文件名
            template: './pinwei/contact.html', //以当前目录下的index.html文件为模板生成dist/index.html文件
        }),

        // new HtmlWebpackPlugin({ //配置
        //     filename: 'index.html', //输出文件名
        //     template: './xinchunkaimenhong/index.html', //以当前目录下的index.html文件为模板生成dist/index.html文件
        // }),

        // new HtmlWebpackPlugin({ //配置
        //     filename: 'qianwen.html', //输出文件名
        //     template: './xinchunkaimenhong/qianwen.html',
        // }),

        // new HtmlWebpackPlugin({ //配置
        //     filename: 'index.html', //输出文件名
        //     template: './xinchunkaimenhong_wx/index.html', //以当前目录下的index.html文件为模板生成dist/index.html文件
        // }),

        // new HtmlWebpackPlugin({ //配置
        //     filename: 'index.html', //输出文件名
        //     template: './message_openApp/index.html',
        // }),

        // new HtmlWebpackPlugin({ //配置
        //     filename: 'index.html', //输出文件名
        //     template: './message_openApp/index.html',
        // }),


        new CleanWebpackPlugin(['dist']), //传入数组,指定要删除的目录
        // 热更新，热更新不是刷新
        new webpack.HotModuleReplacementPlugin()

    ],




    devServer: { //配置此静态文件服务器，可以用来预览打包后项目
        inline: true, //打包后加入一个websocket客户端
        hot: true, //热加载
        contentBase: path.resolve(__dirname, 'dist'), //开发服务运行时的文件根目录
        host: 'localhost', //主机地址
        port: 8080, //端口号
        compress: true //开发服务器是否启动gzip等压缩
    },

}