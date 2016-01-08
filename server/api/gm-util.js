import gm from 'gm';

const debug = require('debug')('app:api-gm-util');

export const identifyPromise = graphicsFile => {
  return new Promise((resolve, reject) => {
    gm(graphicsFile).identify((err, gmdata) => {
      if (err) {
        debug('gm service error, gm identify', err);
        return reject(new Error(err));
      }
      debug('gm identify', gmdata);
      resolve(gmdata);
    });
  });
};
