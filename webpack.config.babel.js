import * as path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HandlebarsPlugin from 'handlebars-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';


// Plugin instances and configs
// -----------------------------------------------------------------------
const extractPlugin = new ExtractTextPlugin({
  filename: 'css/main.[hash].css'
});

const hbsPlugin = new HandlebarsPlugin({
  entry: path.resolve(__dirname, 'src/templates/*.hbs'),
  output: path.resolve(__dirname, 'dist/[name].html')
});

const htmlPlugin = new HtmlWebpackPlugin({
  template: 'src/templates/index.hbs'
});

const cleanPlugin = new CleanWebpackPlugin();

// Work the bundling magic
// -----------------------------------------------------------------------
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
        use: [
          {
            loader: 'ts-loader'
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(svg|gif|png|jpe?g)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'img'
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'fonts'
            }
          }
        ]
      },
      {
        test: /\.hbs$/,
        exclude: /node_modules/,
        use: [ 'html-loader']
      }
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'js/bundle.[hash].js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8000,
  },
  plugins: [ extractPlugin, hbsPlugin, htmlPlugin, cleanPlugin ]
}