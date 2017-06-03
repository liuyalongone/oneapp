var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../app-Hybrid/dist'), //生成dist的路径
    publicPath: 'dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },

      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'//添加对样式表的处理,内联样式
      },

      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]?[hash]' //目标文件夹
        }
      }, //添加对字体文件的支持。

      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,  // 不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 http://oursite.com/user/id 就会返回 404，这就不好看了。

    noInfo: true,
    //配置服务器
    proxy:{
       '/api/*': {
              target: 'http://localhost:3000',
              host: 'localhost:3000',
              changeOrigin:true
          },
        '/javascripts/*': {
              target: 'http://localhost:3000',
              host: 'localhost:3000',
              changeOrigin:true
        },
        '/m.1c10.cn/*': {
              target: 'http://localhost:3000',
              host: 'localhost:3000',
              changeOrigin:true
        }
    }

    /*
      在前端 发起 /v4/api/billboard/home请求

            转发到  http://m.maizuo.com/v4/api/billboard/home
     */
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',

  plugins:[
    new webpack.ProvidePlugin({
        axios: 'axios'  //各个模块都可以使用axios
    }),
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
