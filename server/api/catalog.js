import { loadCatalog } from 'api/util';
// const debug = require('debug')('app:api-catalog');

export default function configureApi(router) {
  router.get('/catalog', (req, res) => {
    loadCatalog((err, catalog) => {
      if (err) throw err;

      res.json(catalog);
    });
  });
}
