import fs from 'fs';
import { pathFromImageDescriptor, urlFromImageDescriptor } from './utils';

const debug = require('debug')('app:api-images');

export default function configureApi(router) {
  debug('configure api post /images');

  router.route('/images')
    .post((req, res /*, next */) => {
      const id = req.body;
      const path = pathFromImageDescriptor(id);
      debug('POST images', { path });

      fs.stat(path, (err, stats) => {
        if (err) {
          debug('file stat error', err);
          return res.json({ task: 'xyzzy' });
        }

        if (!stats.isFile()) {
          debug('not a file', path);
          return res.json({ task: 'xyzzy' });
        }

        debug('file stats', stats);
        return res.json({ url: urlFromImageDescriptor(id) });
      });
    });
}
