const HtmlWebpackPlugin = require('html-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    js: './src/index.js',
  },
  output: {
    filename: 'main.[chunkhash].js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader?minimize&sourceMap',
          {
            loader: 'postcss-loader',
            options: {
              autoprefixer: {
                browser: ['last 2 versions']
              },
              sourceMap: true,
              plugins: () => [autoprefixer]
            }
          },
          'resolve-url-loader',
          'sass-loader?outputStyle=compressed&sourceMap'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        use: [
          'file-loader?name=assets/[name].[ext]',
          'image-webpack-loader?bypassOnDebug'
        ]
      },
      {
        test: /\.(ttf|eot|woff2?|mp4|mp3|txt|xml|pdf)$/i,
        use: 'file-loader?name=assets/[name].[ext]'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist/**/*.*']),
    new MiniCssExtractPlugin({
      filename: 'main.[chunkhash].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['js']
    })
  ]
}
