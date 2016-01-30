import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import historyApiFallback from 'connect-history-api-fallback';
import config from 'config';
import { configureApi } from 'api';

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const debug = require('debug')('app:server');
const paths = config.utils_paths;

const router = express.Router();
configureApi(router);
app.use('/api', router);

app.use('/thumbs', express.static(path.join(paths.base(config.dir_data), 'thumbs')));
app.use('/tiles', express.static(path.join(paths.base(config.dir_data), 'tiles')));

app.use(historyApiFallback({
  verbose: false
}));

// Serve app with Webpack if HMR is enabled
if (config.compiler_enable_hmr) {
  const webpack = require('webpack');
  const webpackConfig = require('../build/webpack');
  const compiler = webpack(webpackConfig);

  app.use(require('./middleware/webpack-dev')({
    compiler,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(require('./middleware/webpack-hmr')({ compiler }));
} else {
  debug(
    'Application is being run outside of development mode. This starter kit ' +
    'does not provide any production-specific server functionality. To learn ' +
    'more about deployment strategies, check out the "deployment" section ' +
    'in the README.'
  );

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(paths.base(config.dir_dist)));
}

export default app;
