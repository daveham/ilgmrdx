import path from 'path';
import fs from 'fs';
import gm from 'gm';
import config from '../../config';

const debug = require('debug')('app:api');
const catalogDataFile = path.join(config.dir_data, 'data.json');

const loadCatalog = (cb) => {
  fs.readFile(catalogDataFile, 'utf8', (err, data) => {
    if (err) {
      debug('loadCatalog error', err);
      cb(err);
    } else {
      // TODO: catch exception in JSON parsing
      cb(null, JSON.parse(data));
    }
  });
};

const loadSource = (id, cb) => {
  loadCatalog((err, catalog) => {
    if (err) return cb(err);

    const item = catalog.sources.find(source => source.id === id);
    if (item) return cb(null, item);

    cb(new Error(`source item ${id} not found`));
  });
};

export function configureApi(router) {

  router.get('/catalog', (req, res) => {
    loadCatalog((err, catalog) => {
      if (err) throw err;

      res.json(catalog);
    });
  });

  router.get('/sourcemetadata/:id', (req, res) => {
    const { id } = req.params;

    loadSource(id, (err, source) => {
      if (err) throw err;

      const photoFile = path.resolve(__dirname, '../../data/sources/' + source.file);

      let info = {
        id,
        filename: source.file
      };
      try {
        const stat = fs.statSync(photoFile);
        debug('file stat', stat);
        info.status = 'exists';
        info.ctime = stat.ctime;
        info.size = stat.size;

        gm(photoFile).identify((err, gmdata) => {
          if (err) {
            debug('photo service error, gm identify', err);
            throw err;
          } else {
            debug('gm identify', gmdata);
          }

          info.format = gmdata.Format;
          info.width = gmdata.size.width;
          info.height = gmdata.size.height;
          info.depth = gmdata.depth;
          info.resolution = gmdata.Resolution;
          info.filesize = gmdata.Filesize;
          res.json(info);
        });
      } catch (e) {
        debug('photo service exception', e.message);
        info.status = 'file error - ' + e.message;
        res.json(info);
      }
    });
  });

}
