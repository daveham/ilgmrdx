import path from 'path';
import fs from 'fs';
import gm from 'gm';
import { loadSource } from './util';
const debug = require('debug')('app:api-sourcemetadata');

const statPromise = photoFile => {
  return new Promise((resolve, reject) => {
    fs.stat(photoFile, (err, stats) => {
      if (err) {
        debug('file stat error', err);
        return reject(new Error(err));
      }

      if (!stats.isFile()) {
        debug('not a file', photoFile);
        return reject(new Error(`${photoFile} is not a file`));
      }

      debug('file stats', stats);
      resolve(stats);
    });
  });
};

const identifyPromise = photoFile => {
  return new Promise((resolve, reject) => {
    gm(photoFile).identify((err, gmdata) => {
      if (err) {
        debug('photo service error, gm identify', err);
        return reject(new Error(err));
      }
      debug('gm identify', gmdata);
      resolve(gmdata);
    });
  });
};

const writeCachePromise = (cachePath, file, cacheData) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(cachePath, (err) => {
      debug('ignoring mkdir error', err);
      const fullFile = path.join(cachePath, file);
      fs.writeFile(fullFile, JSON.stringify(cacheData), (err) => {
        if (err) {
          debug('write cache promise error', err);
          return reject(new Error(err));
        }
        debug('wrote cache file', fullFile);
        resolve(true);
      });
    });
  });
};

const unpackStats = (dest, data) => {
  dest.ctime = data.ctime;
  dest.size = data.size;
};

const unpackIdentify = (dest, data) => {
  dest.format = data.Format;
  dest.width = data.size.width;
  dest.height = data.size.height;
  dest.depth = data.depth;
  dest.resolution = data.Resolution;
  dest.filesize = data.Filesize;
};

export default function configureApi(router) {
  router.get('/sourcemetadata/:id', (req, res, next) => {
    const { id } = req.params;

    const cachePath = path.resolve(__dirname, `../../data/stats/${id}/`);
    const cacheFilename = 'data.json';
    const cacheFile = path.join(cachePath, cacheFilename);

    fs.readFile(cacheFile, 'utf8', (err, data) => {
      if (!err) {
        debug('using cached file');
        return res.json(JSON.parse(data));
      }

      loadSource(id, (err, source) => {
        if (err) {
          return next(err);
        }

        const photoFile = path.resolve(__dirname, `../../data/sources/${source.file}`);
        let info = { id, filename: source.file };

        Promise.all([
          statPromise(photoFile),
          identifyPromise(photoFile)
        ])
        .then(data => {
          info.status = 'exists';

          unpackStats(info, data[0]);
          unpackIdentify(info, data[1]);

          return writeCachePromise(cachePath, cacheFilename, info);
        })
        .then(() => {
          return res.json(info);
        })
        .catch(error => {
          info.error = error.message;
          info.status = 'file error';
          res.json(info);
        });
      });
    });

  });
}
