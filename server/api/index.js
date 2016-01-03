import configureCatalogApi from './catalog';
import configureSourceMetadataApi from './sourcemetadata';

export function configureApi(router) {

  configureCatalogApi(router);
  configureSourceMetadataApi(router);
}
