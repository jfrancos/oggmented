module.exports = {
  entry: './src/js/oggmented.js',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ['@babel/preset-env']
          // }
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'oggmented-bundle.js',
    library: 'oggmented',
    libraryTarget: 'umd'
  },
  // devServer: {
  //   contentBase: './dist'
  // }
};