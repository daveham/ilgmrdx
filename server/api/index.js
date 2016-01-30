import configureCatalogApi from 'api/catalog';
// import configureSourceApi from './source';
import configureSourcethumbsApi from 'api/sourcethumbs';
import configureSourceMetadataApi from 'api/sourcemetadata';

export function configureApi(router) {

  configureCatalogApi(router);
//  configureSourceApi(router);
  configureSourcethumbsApi(router);
  configureSourceMetadataApi(router);
}
