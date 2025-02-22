import * as path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
  mode: 'production',
  entry: {
    app: path.resolve(path.resolve(), 'src', 'index')
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json', '.css'],
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/compat',
    }
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve('public', 'index.html') })
  ],
  performance: {
    hints: false,
  },
  output: {
    clean: true,
    filename: '[name].js',
    path: path.resolve('build'),
    publicPath: '/',
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  optimization: {
    minimize: false,
    chunkIds: 'named',
    moduleIds: 'named',
    mangleExports: false,
    splitChunks: {
      hidePathInfo: true,
      cacheGroups: {
        "preact": {
          test: /preact/,
          name: "preact",
          chunks: 'all',
        },
        "kr-observable": {
          test: /observable/,
          name: "kr-observable",
        },
        "webpack": {
          test: /webpack/,
          name: "webpack",
        },
      }
    },
  },
  module: {
    rules: [
      {
        loader: 'swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: "typescript",

            },
            target: 'es2022',
            loose: false,
            transform: {
              react: {
                runtime: 'automatic'
              }
            }
          }
        },
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        type: 'assets/resource',
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jp(e*))g|svg$/,
        type: 'assets/resource',
      }
    ]
  },
  devServer: {
    hot: false,
    historyApiFallback: true,
    port: 3000,
    open: true,
    server: {
      type: 'https'
    }
  }
}