import path from 'path';
import glob from 'glob';
import config from 'config';
import { thumbPromise } from 'api/gm-util';
const debug = require('debug')('app:api-sourcethumbs');

const paths = config.utils_paths;

export default function configureApi(router) {

  router.route('/sourcethumbs')
    .get((req, res, next) => {
      debug('get all sourcethumbs');
      const thumbPath = path.join(paths.base(config.dir_data), 'thumbs');
      glob('*_thumb.jpg', { cwd: thumbPath, nodir: true }, (err, data) => {
        if (err) {
          debug('glob error', err);
          return next(err);
        }

        // debug('glob data', data);
        data = data.map(name => name.substring(0, name.indexOf('_')));
        res.json(data);
      });
    })
    .post((req, res, next) => {
      const { id, sourceName } = req.body;
      debug('sourceName, id', sourceName, id);
      const sourcePath = path.join(paths.base(config.dir_data), 'sources', sourceName);
      const thumbPath = path.join(paths.base(config.dir_data), 'thumbs', `${id}_thumb.jpg`);
      thumbPromise(sourcePath, thumbPath)
        .then(data => {
          res.json({ thumb: thumbPath });
        })
        .catch(error => {
          debug('thumb promise error', error);
          next(error);
        });
    });
}
