module.exports = {
  entry: './client/index.jsx',
  output: {
    path: __dirname + '/public',
    filename: 'recipes.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      }
    ]
  }
}