mcd.test.caching.testInit(mcd.properties.caching.init.expectedOutput,0);
mcd.test.caching.testLoadLookup(mcd.properties.caching.loadLookup.expectedOutputIPhone,mcd.properties.caching.loadLookup.expectedOutputAndroid,0);
mcd.test.caching.testPutJSONObject(mcd.properties.caching.putJSONObject.objectID,mcd.properties.caching.putJSONObject.JSONObj,mcd.properties.caching.putJSONObject.opt_timestamp,mcd.properties.caching.putJSONObject.expectedOutput,0);
mcd.test.caching.testGetJSONObject(mcd.properties.caching.getJSONObject.objectID,mcd.properties.caching.getJSONObject.expectedOutput,0);
mcd.test.caching.testDeleteJSONObject(mcd.properties.caching.deleteJSONObject.objectID,mcd.properties.caching.deleteJSONObject.expectedOutput,0);
mcd.test.caching.testGetResourceID(mcd.properties.caching.getResourceID.url,mcd.properties.caching.getResourceID.expectedOutput,0);
mcd.test.caching.testGetCacheableResource(mcd.properties.caching.getCacheableResource.url,mcd.properties.caching.getCacheableResource.opt_timeout,mcd.properties.caching.getCacheableResource.expectedOutput,0);
mcd.test.caching.testDeleteFromCache(mcd.properties.caching.deleteFromCache.url,mcd.properties.caching.deleteFromCache.expectedOutput,0);