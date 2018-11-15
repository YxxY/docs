module.exports = {
  entry: {
    home: './static/home.js'
  },
  output: {
    path: __dirname + '/static',
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
          },
        ]
      },
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
    ]
  },
  // mode: 'development'
  mode: 'production'

}
