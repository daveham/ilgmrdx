import path from 'path';
import fs from 'fs';
import gm from 'gm';
import { loadSource } from './util';
const debug = require('debug')('app:api-sourcemetadata');

export default function configureApi(router) {
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
