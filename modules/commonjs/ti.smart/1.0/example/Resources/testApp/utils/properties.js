(function() {

	mcd.properties = {};
	mcd.properties.caching = {};
	mcd.properties.caching.init = {};
	mcd.properties.caching.init.expectedOutput = 'Cache directory exists';

	mcd.properties.caching.loadLookup = {};
	mcd.properties.caching.loadLookup.expectedOutputIPhone = 'number';
	mcd.properties.caching.loadLookup.expectedOutputAndroid = 'string';

	mcd.properties.caching.putJSONObject = {};
	mcd.properties.caching.putJSONObject.objectID = '123';
	mcd.properties.caching.putJSONObject.JSONObj = {
		name : "ABC"
	};
	mcd.properties.caching.putJSONObject.opt_timestamp = '';
	mcd.properties.caching.putJSONObject.expectedOutput = JSON.stringify({
		name : 'ABC'
	});

	mcd.properties.caching.getJSONObject = {};
	mcd.properties.caching.getJSONObject.objectID = '456';
	mcd.properties.caching.getJSONObject.expectedOutput = JSON.stringify({
		name : 'DEF'
	});

	mcd.properties.caching.deleteJSONObject = {};
	mcd.properties.caching.deleteJSONObject.objectID = '789';
	mcd.properties.caching.deleteJSONObject.expectedOutput = 0;

	mcd.properties.caching.getResourceID = {};
	mcd.properties.caching.getResourceID.url = 'abc/def/ghi';
	mcd.properties.caching.getResourceID.expectedOutput = '2a74c5ghi';

	mcd.properties.caching.getCacheableResource = {};
	mcd.properties.caching.getCacheableResource.url = 'http://dbus.freedesktop.org/doc/dbus-python/doc/tutorial.txt';
	mcd.properties.caching.getCacheableResource.opt_timeout = '';

	var file2 = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'testApp/utils/tute.txt');
	var cont2 = file2.read().text
	mcd.properties.caching.getCacheableResource.expectedOutput = cont2;

	mcd.properties.caching.deleteFromCache = {};
	mcd.properties.caching.deleteFromCache.url = 'qwe/rty/uio';
	mcd.properties.caching.deleteFromCache.expectedOutput = 0;

	mcd.properties.db = {};

	mcd.properties.db.executeSql = {};
	mcd.properties.db.executeSql.databaseName = 'testDB';
	//please use this Database for all testing purposes
	mcd.properties.db.executeSql.sqlQueryList = ['INSERT INTO myTable VALUES (5000,' + '"McD"' + ')'];
	mcd.properties.db.executeSql.paramsList = '';
	mcd.properties.db.executeSql.evt = '';
	mcd.properties.db.executeSql.expectedOutput1 = 5000;
	mcd.properties.db.executeSql.expectedOutput2 = 'McD';

	mcd.properties.db.executeSqlWithReturn = {};
	mcd.properties.db.executeSqlWithReturn.databaseName = 'testDB';
	//please use this Database for all testing purposes
	mcd.properties.db.executeSqlWithReturn.sqlQuery = 'SELECT * FROM myTable2 WHERE P_Id=(?)';
	mcd.properties.db.executeSqlWithReturn.params = 6000;
	mcd.properties.db.executeSqlWithReturn.expectedOutput = 'Mac';

	mcd.properties.db.deleteDB = {};
	mcd.properties.db.deleteDB.databaseName = 'testDB';
	//please use this Database for all testing purposes
	mcd.properties.db.deleteDB.evt = 'db_del';
	mcd.properties.db.deleteDB.expectedOutput = false;
	//does the database exist after delete operation=false

	mcd.properties.db.installExistingDB = {};
	mcd.properties.db.installExistingDB.dbPath = '';
	mcd.properties.db.installExistingDB.databaseName = '';
	mcd.properties.db.installExistingDB.evt = '';
	mcd.properties.db.installExistingDB.expectedOutput = 'Did new database get installed? true';

	mcd.properties.file = {};
	mcd.properties.file.checkFileExistence = {};
	f1 = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'f1.txt');
	f1.write('abc123');
	mcd.properties.file.checkFileExistence.filePath = '';
	mcd.properties.file.checkFileExistence.fileName = 'f1.txt';
	mcd.properties.file.checkFileExistence.expectedOutput = true;

	mcd.properties.file.writeToFile = {};
	mcd.properties.file.writeToFile.filePath = '';
	mcd.properties.file.writeToFile.fileName = 'f3.txt';
	mcd.properties.file.writeToFile.content = 'First Line\n';
	mcd.properties.file.writeToFile.expectedOutput = 'First Line\n';

	mcd.properties.file.appendToFile = {};
	mcd.properties.file.appendToFile.filePath = '';
	mcd.properties.file.appendToFile.fileName = 'f4.txt';
	mcd.properties.file.appendToFile.content = 'Appended Line';
	mcd.properties.file.appendToFile.existingContent = 'main line\n';
	mcd.properties.file.appendToFile.expectedOutput = 'main line\n' + 'Appended Line';

	mcd.properties.file.readFromFile = {};
	var f5 = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'f5.txt');
	f5.write('first line\n');
	f5.write('second line\n', true);
	mcd.properties.file.readFromFile.filePath = '';
	mcd.properties.file.readFromFile.fileName = 'f5.txt';
	mcd.properties.file.readFromFile.expectedOutput = 'first line\nsecond line\n';

	mcd.properties.file.checkAvailableSpace = {};
	mcd.properties.file.checkAvailableSpace.expectedOutput = true;

	mcd.properties.restaurant = {};
	mcd.properties.restaurant.createAnnotations = {};
	mcd.properties.restaurant.createAnnotations.mapObj = [{
		latitude : 37.422502,
		longitude : -122.0855498,
		address : {
			street : 'street',
			city : 'city'
		},
		name : 'Home'
	}];
	mcd.properties.restaurant.createAnnotations.expectedOutput1 = 37.422502;
	mcd.properties.restaurant.createAnnotations.expectedOutput2 = -122.0855498;

	mcd.properties.restaurant.locateUser = {};
	mcd.properties.restaurant.locateUser.evt = 'myLoc';
	mcd.properties.restaurant.locateUser.expectedOutput1 = 'A value for latitude';
	mcd.properties.restaurant.locateUser.expectedOutput2 = 'A value for longitude';

	mcd.properties.location = {};
	mcd.properties.location.setPurpose = {};
	mcd.properties.location.setPurpose.purpose = 'Testing McD';
	mcd.properties.location.setPurpose.expectedOutput = 'Testing McD';

	mcd.properties.location.createAnnotation = {};
	mcd.properties.location.createAnnotation.location = {
		coords : {
			latitude : 37.331689,
			longitude : -122.030731,

		},
		address : {
			street : 'street',
			city : 'city'
		},
		name : 'Home'
	};
	mcd.properties.location.createAnnotation.expectedOutput = {
		coords : {
			latitude : 37.331689,
			longitude : -122.030731,

		},
		address : {
			street : 'street',
			city : 'city'
		},
		name : 'Home'
	};

	mcd.properties.location.getAddress = {};
	mcd.properties.location.getAddress.evt = 'geo';
	mcd.properties.location.getAddress.location = {
		coords : {
			latitude : 37.422502,
			longitude : -122.0855498,
		}
	}
	mcd.properties.location.getAddress.expectedOutput = {
		address : {
			street : 'Amphitheatre Parkway',
			city : 'Santa Clara',
		}
	}

	mcd.properties.location.getPosition = {};
	mcd.properties.location.getPosition.evt = 'getPosition';
	mcd.properties.location.getPosition.expectedOutput = 'defined';

	mcd.properties.network = {};
	mcd.properties.network.checkNetworkConnection = {};
	var isAvailable;
	if(Ti.Network.online) {
		isAvailable = 1;
	} else {
		isAvailable = 0;
	}
	mcd.properties.network.checkNetworkConnection.expectedOutput = isAvailable;

	mcd.properties.network.getNetworkType = {};
	mcd.properties.network.getNetworkType.expectedOutput = Titanium.Network.networkTypeName;

	mcd.properties.security = {};
	mcd.properties.security.encrypt = {};
	mcd.properties.security.encrypt.stringToEncrypt = 'ABCDEFGH';
	mcd.properties.security.encrypt.key = 'asdf';
	mcd.properties.security.encrypt.expectedOutput = 'ABCDEFGH';

	mcd.properties.security.decrypt = {};
	mcd.properties.security.decrypt.stringToEncrypt = 'IJKLMNO';
	mcd.properties.security.decrypt.key = 'qwert';
	mcd.properties.security.decrypt.expectedOutput = 'IJKLMNO';

	mcd.properties.security.setString = {};
	mcd.properties.security.setString.name = 'My Property';
	mcd.properties.security.setString.value = 'MYAPP';
	mcd.properties.security.setString.key = 'asdf';
	mcd.properties.security.setString.expectedOutput = 'MYAPP';

	mcd.properties.security.getString = {};
	mcd.properties.security.getString.name = 'My Property2';
	mcd.properties.security.getString.key = 'asdf';
	mcd.properties.security.getString.expectedOutput = 'MYAPP2';

	mcd.properties.sessionmgmt = {};
	mcd.properties.sessionmgmt.getCookie = {};
	mcd.properties.sessionmgmt.getCookie.name = 'PREF';
	mcd.properties.sessionmgmt.getCookie.expectedOutput = 'defined';

	mcd.properties.sessionmgmt.removeAllCookies = {};
	mcd.properties.sessionmgmt.removeAllCookies.expectedOutput = 'undefined';

	mcd.properties.utils = {};
	mcd.properties.utils.cleanTelNumber = {};
	mcd.properties.utils.cleanTelNumber.rawTelNumber = '+9477-1234567';
	mcd.properties.utils.cleanTelNumber.expectedOutput = '94771234567';

	mcd.properties.utils.isBoolean = {};
	mcd.properties.utils.isBoolean.testInput = true;
	mcd.properties.utils.isBoolean.opt_warn = true;
	mcd.properties.utils.isBoolean.expectedOutput = true;

	mcd.properties.utils.isNull = {};
	mcd.properties.utils.isNull.testInput = 'ABC';
	mcd.properties.utils.isNull.opt_warn = true;
	mcd.properties.utils.isNull.expectedOutput = false;

	mcd.properties.utils.isNumber = {};
	mcd.properties.utils.isNumber.testInput = 100;
	mcd.properties.utils.isNumber.opt_warn = true;
	mcd.properties.utils.isNumber.expectedOutput = true;

	mcd.properties.utils.isString = {};
	mcd.properties.utils.isString.testInput = 'ABC';
	mcd.properties.utils.isString.opt_warn = true;
	mcd.properties.utils.isString.expectedOutput = true;

	mcd.properties.utils.isValidEmail = {};
	mcd.properties.utils.isValidEmail.emailAddress = 'ABC@gmail.com';
	mcd.properties.utils.isValidEmail.opt_warn = true;
	mcd.properties.utils.isValidEmail.expectedOutput = true;

	mcd.properties.utils.isValidUSZipCode = {};
	mcd.properties.utils.isValidUSZipCode.zipCode = '91301';
	mcd.properties.utils.isValidUSZipCode.opt_warn = true;
	mcd.properties.utils.isValidUSZipCode.expectedOutput = true;

	mcd.properties.utils.isValidWebAddress = {};
	mcd.properties.utils.isValidWebAddress.webAddress = 'http://www.google.lk';
	mcd.properties.utils.isValidWebAddress.opt_warn = true;
	mcd.properties.utils.isValidWebAddress.expectedOutput = true;

	mcd.properties.utils.scale = {};
	mcd.properties.utils.scale.numToScale = 100;
	mcd.properties.utils.scale.positioning = 'v';
	mcd.properties.utils.scale.expectedOutput = 100 * (Titanium.Platform.displayCaps.platformHeight / 480);

})();
