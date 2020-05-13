const webpack = require('webpack');

const Dotenv = require('dotenv-webpack');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    mode: 'development',
    context: __dirname,
    entry: {
        general: './src/js/general.js',
        memes: './src/js/memes.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        publicPath: '/dist/'
    },
    devServer: {
        compress: true,
        port: 8080,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            {
                test: /\.(less|css)$/,
                use: [
                  {
                    loader: 'style-loader', // creates style nodes from JS strings
                  },
                  {
                    loader: 'css-loader', // translates CSS into CommonJS
                  },
                  {
                    loader: 'less-loader',
                    options: {
                        sourceMap: true
                    } // compiles Less to CSS
                  },
                ],
              },
              {
                  test: /\.(svg|eot|ttf|woff|woff2)$/,
                  loader: 'url-loader',
                  options: {
                      limit: 10000,
                      name: 'fonts/[name].[ext]'
                  }
              },
              {
                  test: /\.(png|jpg|gif)$/,
                  loaders: [
                      {
                          loader: 'url-loader',
                          options: {
                              limit: 10000,
                              name: 'images/[name].[ext]'
                          }
                      },
                      'img-loader'
                  ] 
              }
            
        ]
    },
    devtool: 'source-map',
    plugins: [
        new webpack.ProvidePlugin({ 
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new Dotenv()
    ],

}



/* Non Production Plugins */
if (isProduction) {
    modele.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
    );
}



/* Production Plugins */