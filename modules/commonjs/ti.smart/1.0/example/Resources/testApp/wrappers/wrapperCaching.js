(function() {
	mcd.test.caching = {};
	mcd.test.caching.testInit = function(expectedOutput, flag) {
		var older = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'mcdcache');
		if(older.exists()) {

			older.deleteFile();
		}
		var result = false;
		mcd.cache.init();
		var d = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'mcdcache');
		if(d.exists()) {

			result = true;
		}
		var error = 'Expected: ' + expectedOutput + '\nActual: Cache directory does not exist \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>cache.Init</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('Init.xml', string);

	}
	mcd.test.caching.testLoadLookup = function(expectedOutputIPhone, expectedOutputAndroid, flag) {
		var result = false;
		var data = {
			name : "BNM"
		}
		mcd.cache.lookup = [];
		mcd.cache.putJSONObject('bnm', data, '');

		mcd.cache.loadLookup();
		var val = mcd.cache.lookup['bnm'];
		var error = 'def';
		if(Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad') {
			if( typeof val == expectedOutputIPhone) {
				result = true;
				error = 'Expected: ' + expectedOutputIPhone + '\nActual: ' + typeof mcd.cache.lookup['bnm'] + ' \n';

			}
		} else {
			if( typeof val == expectedOutputAndroid) {
				result = true;
				error = 'Expected: ' + expectedOutputAndroid + '\nActual: ' + typeof mcd.cache.lookup['bnm'] + ' \n';

			}
		}

		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>cache.LoadLookup</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('LoadLookup.xml', string);

	}

	mcd.test.caching.testPutJSONObject = function(objectID, JSONObj, opt_timestamp, expectedOutput, flag) {

		mcd.cache.putJSONObject(objectID, JSONObj, opt_timestamp);
		var output = mcd.cache.getJSONObject('123');
		var result = isEqual(expectedOutput, JSON.stringify(output));
		var error = 'Expected: ' + expectedOutput + '\nActual: ' + output + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>cache.PutJSONObject</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('PutJSONObject.xml', string);
	}

	mcd.test.caching.testGetJSONObject = function(objectID, expectedOutput, flag) {

		var data2 = JSON.parse(expectedOutput);
		mcd.cache.putJSONObject(objectID, data2, '');
		var output = mcd.cache.getJSONObject(objectID);

		var result = isEqual(expectedOutput, JSON.stringify(output));
		var error = 'Expected: ' + expectedOutput + '\nActual: ' + output + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>cache.GetJSONObject</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('GetJSONObject.xml', string);

	}
	mcd.test.caching.testDeleteJSONObject = function(objectID, expectedOutput, flag) {
		var cacheDBName = 'mcdCacheDB';
		var data3 = {
			name : "GHI"
		}
		mcd.cache.putJSONObject(objectID, data3, '');
		mcd.cache.deleteJSONObject(objectID);
		cacheDB = Ti.Database.open(cacheDBName);
		var records = cacheDB.execute('SELECT RESOURCEID,JSONOBJ FROM ' + 'mcdCacheTable' + ' WHERE RESOURCEID = ?', '789');

		var rows = records.rowCount;
		var result = isEqual(expectedOutput, rows);
		cacheDB.close();
		var error = 'Expected: ' + expectedOutput + '\nActual: ' + rows + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>cache.DeleteJSONObject</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('DeleteJSONObject.xml', string);

	}
	mcd.test.caching.testGetResourceID = function(url, expectedOutput, flag) {
		var id = mcd.cache.getResourceID(url);

		var result = isEqual(expectedOutput, id);
		var error = 'Expected: ' + expectedOutput + '\nActual: ' + id + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>cache.GetResourceID</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('GetResourceID.xml', string);

	}

	mcd.test.caching.testGetCacheableResource = function(url, opt_timeout, expectedOutput, flag) {

		var resourceName = mcd.cache.getResourceID(url);
		var cacheFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'mcdcache', resourceName);
		if(cacheFile.exists()) {

			mcd.cache.getCacheableResource(url, 10000);

			setTimeout(function() {
				var natPath = mcd.cache.getCacheableResource(url, 10000);

				var file = Titanium.Filesystem.getFile(natPath);
				var cont1 = file.read().text;

				var result = isEqual(cont1, expectedOutput);
				var error = 'Expected: ' + expectedOutput + '\nActual: ' + cont1 + ' \n';
				var detail = 'Framework Error';
				var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>cache.GetCacheableResource</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

				if(flag === 1) {
					var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
					alert(alertString);
				} else
					writeMethodFile('GetCacheableResource.xml', string);
			}, 10000);
		} else {

			if(Ti.Network.online) {
				mcd.cache.getCacheableResource(url, 10000);

				setTimeout(function() {
					var natPath = mcd.cache.getCacheableResource(url, 10000);

					var file = Titanium.Filesystem.getFile(natPath);
					var cont1 = file.read().text;

					var result = isEqual(cont1, expectedOutput);
					var error = 'Expected: ' + expectedOutput + '\nActual: ' + cont1 + ' \n';
					var detail = 'Framework Error or Incorrect Resource URL';
					var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>cache.GetCacheableResource</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

					if(flag === 1) {
						var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
						alert(alertString);
					} else
						writeMethodFile('GetCacheableResource.xml', string);
				}, 10000);
			} else {
				var result = false;
				var error = 'Expected: ' + expectedOutput + '\nActual:  \n';
				var detail = 'No network';
				var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>cache.GetCacheableResource</name>\n' + '<pass>' + 'scope' + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

				if(flag === 1) {
					var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
					alert(alertString);
				} else
					writeMethodFile('GetCacheableResource.xml', string);
			}
		}
	}
	mcd.test.caching.testDeleteFromCache = function(url, expectedOutput, flag) {
		var result = false;
		cacheDB = Ti.Database.open('mcdCacheDB');
		var opt_timeout = 10000;
		var resourceName = mcd.cache.getResourceID(url);
		var cacheFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'mcdcache', resourceName);

		cacheFile.write('aaaaaaaaaaaaaaaaaaaaaa');

		var d = new Date();
		if( typeof opt_timeout === 'number') {
			cacheDB.execute('INSERT INTO ' + 'mcdCacheResourceTable' + '(RESOURCEID,TIMEOUT) VALUES(?,?)', resourceName, opt_timeout + d.getTime());
		}
		mcd.cache.deleteFromCache(url);

		var records = cacheDB.execute('SELECT * FROM ' + 'mcdCacheResourceTable' + ' WHERE RESOURCEID = ?', resourceName);

		var rows = records.rowCount;
		cacheDB.close();

		var cacheFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'mcdcache', resourceName);

		if(!(cacheFile.exists()) && (rows === expectedOutput)) {

			result = true;

		}
		var error = 'Expected: Number of entries with the given url=' + expectedOutput + '\nActual: Number of entries with the given url=' + rows + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>cache.DeleteFromCache</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('DeleteFromCache.xml', string);
	}
})();
