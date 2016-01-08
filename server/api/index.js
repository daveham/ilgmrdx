import configureCatalogApi from './catalog';
import configureSourceApi from './source';
import configureSourceMetadataApi from './sourcemetadata';

export function configureApi(router) {

  configureCatalogApi(router);
  configureSourceApi(router);
  configureSourceMetadataApi(router);
}
