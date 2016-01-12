import configureCatalogApi from './catalog';
// import configureSourceApi from './source';
import configureSourcethumbsApi from './sourcethumbs';
import configureSourceMetadataApi from './sourcemetadata';

export function configureApi(router) {

  configureCatalogApi(router);
//  configureSourceApi(router);
  configureSourcethumbsApi(router);
  configureSourceMetadataApi(router);
}
