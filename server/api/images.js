//import path from 'path';
//import glob from 'glob';
//import config from 'config';
//import { thumbPromise } from 'api/gm-util';
const debug = require('debug')('app:api-images');

//const paths = config.utils_paths;

export default function configureApi(router) {
  debug('configure api post /images');

  router.route('/images')
    .post((req, res /*, next */) => {
      debug('POST images', req.body);

      res.json({ task: 'xyzzy' });
    });
}
