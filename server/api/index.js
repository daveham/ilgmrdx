import path from 'path';
import fs from 'fs';
import config from '../../config';

const debug = require('debug')('app:api');

export function configureApi (router) {
  router.get('/catalog', (req, res) => {
    const catalogDataFile = path.join(config.dir_data, 'data.json');
    fs.readFile(catalogDataFile, 'utf8', (err, data) => {
      if (err) {
        debug('fs.readFile error', err);
        throw err;
      }
      res.json(JSON.parse(data));
    });
  });

  router.get('/sourcemetadata/:id', (req, res) => {
    const { id } = req.params;
    setTimeout(() => {
      res.json({
        id,
        size: 1024
      });
    }, 1000);
  });
}
