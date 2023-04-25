import path from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

const webpackConfig = (env) => {
  const isDev = !env.production || env.development;

  const config: Configuration = {
    entry: './src/index.tsx',
    mode: isDev ? 'development' : 'production',
    ...(!isDev ? {} : { devtool: 'eval-source-map' }),
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      plugins: [new TsconfigPathsPlugin()],
      modules: ['node_modules']
    },
    output: {
      path: path.join(__dirname, 'dist'),
      clean: true,
      filename: '[name].[contenthash].js'
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          },
          exclude: /dist/
        },
        {
          test: /\.css$/,
          exclude: /\.module.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false,
                modules: 'global'
              }
            }
          ]
        },
        {
          test: /\.module.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: isDev ? '[name]_[local]_[hash:base64:5]' : '[hash:base64:5]'
                }
              }
            }
          ]
        }
      ]
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({ extractComments: false }), new CssMinimizerPlugin()]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html'
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: 'public/fonts', to: 'fonts' }]
      }),
      new ForkTsCheckerWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      })
    ]
  };
  return config;
};

export default webpackConfig;
