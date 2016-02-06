import express from 'express';
import webpack from 'webpack';
import webpackConfig from '../build/webpack.config';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import historyApiFallback from 'connect-history-api-fallback';
import _debug from 'debug';
import config from 'config';

const debug = _debug('app:server');
const paths = config.utils_paths;

import { configureApi } from 'api';

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();
configureApi(router);
app.use('/api', router);

app.use('/thumbs', express.static(path.join(paths.base(config.dir_data), 'thumbs')));
app.use('/tiles', express.static(path.join(paths.base(config.dir_data), 'tiles')));

app.use(historyApiFallback({
  verbose: false
}));

if (config.env === 'development') {
  const compiler = webpack(webpackConfig);

  // Enable webpack-dev and webpack-hot middleware
  const { publicPath } = webpackConfig.output;

  app.use(require('./middleware/webpack-dev')(compiler, publicPath));
  app.use(require('./middleware/webpack-hmr')(compiler));

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(paths.client('static')));
} else {
  debug(
    'Server is being run outside of live development mode. This starter kit ' +
    'does not provide any production-ready server functionality. To learn ' +
    'more about deployment strategies, check out the "deployment" section ' +
    'in the README.'
  );

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(paths.base(config.dir_dist)));
}

export default app;
