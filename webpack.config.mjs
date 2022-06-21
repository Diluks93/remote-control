import { resolve } from 'node:path';
import { merge } from 'webpack-merge';

const commonConfig = {
  entry: resolve('index.ts'),
  output: {
    path: resolve('dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [
      { test: /\.ts?$/, loader: 'ts-loader', exclude: /node_modules/ },
    ]
  },
  target: 'node',
};

const developmentConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  optimization: {
    minimize: false
  }
}

const productionConfig = {
  mode: 'production',
}

export default (env, args) => {
  switch(args.mode) {
    case 'development':
      return merge(commonConfig, developmentConfig);
    case 'production':
      return merge(commonConfig, productionConfig);
    default:
      throw new Error('No matching configuration was found!');
  }
}
