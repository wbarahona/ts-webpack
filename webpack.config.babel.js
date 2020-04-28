import * as path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HandlebarsPlugin from 'handlebars-webpack-plugin';

const extractPlugin = new ExtractTextPlugin({
  filename: 'main.css'
});

const hbsPlugin= new HandlebarsPlugin({
  entry: path.resolve(__dirname, 'src/templates/*.hbs'),
  output: path.resolve(__dirname, 'dist/[name].html')
});

export default {
  context: path.resolve(__dirname),
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        use: extractPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader'
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8000,
  },
  plugins: [ extractPlugin, hbsPlugin ]
}