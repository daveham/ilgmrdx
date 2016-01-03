import path from 'path';
import fs from 'fs';
import config from '../../config';

const debug = require('debug')('app:api-util');
const catalogDataFile = path.join(config.dir_data, 'data.json');

export const loadCatalog = (cb) => {
  fs.readFile(catalogDataFile, 'utf8', (err, data) => {
    if (err) {
      debug('loadCatalog error', err);
      return cb(err);
    }

    // TODO: catch exception in JSON parsing
    cb(null, JSON.parse(data));
  });
};

export const loadSource = (id, cb) => {
  loadCatalog((err, catalog) => {
    if (err) {
      debug('loadSource error', err);
      return cb(err);
    }

    const item = catalog.sources.find(source => source.id === id);
    if (item) return cb(null, item);

    cb(new Error(`source item ${id} not found`));
  });
};
