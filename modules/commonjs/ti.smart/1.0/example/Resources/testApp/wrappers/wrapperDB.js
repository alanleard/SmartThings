(function() {
	mcd.test.db = {};
	function cleanDB(databaseName) {
		var dbPath;
		var dbFile;
		if(Ti.Platform.osname == 'android') {
			dbPath = 'file:///data/data/' + Ti.App.getID() + '/databases/';
			dbFile = Ti.Filesystem.getFile(dbPath + databaseName);
		} else {
			dbPath = Ti.Filesystem.applicationSupportDirectory + '/database/';
			dbFile = Ti.Filesystem.getFile(dbPath + databaseName + '.sqlite');
		}

		db = Ti.Database.open(databaseName);
		db.remove();
	}

	function getDBPath(databaseName) {
		var dbPath;

		if(Ti.Platform.osname == 'android') {
			dbPath = 'file:///data/data/' + Ti.App.getID() + '/databases/';
		} else {
			dbPath = Ti.Filesystem.applicationSupportDirectory + '/database/';
		}
		return dbPath
	}


	mcd.test.db.testExecuteSql = function(databaseName, sqlQueryList, paramsList, evt, expectedOutput1, expectedOutput2, flag) {
		cleanDB(databaseName);
		var result = false;
		db = Ti.Database.open('testDB');

		db.execute('CREATE TABLE IF NOT EXISTS myTable (P_Id INT, name TEXT)');
		mcd.db.executeSql(databaseName, sqlQueryList, paramsList, evt);

		Ti.App.addEventListener('rowAdded', function() {

		});

		var out = db.execute('SELECT * FROM myTable');

		var pID, name;
		while(out.isValidRow()) {
			pID = out.fieldByName('P_Id');
			name = out.fieldByName('name');
			out.next();
		}
		out.close();

		var result1 = isEqual(pID, expectedOutput1);
		var result2 = isEqual(name, expectedOutput2);

		if(result1 == true && result2 == true)
			result = true;
		else
			result = false;
		var error = 'Expected: ' + expectedOutput1 + ',' + expectedOutput2 + '\nActual: ' + pID + ',' + name + ' \n';

		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>db.executeSql</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('ExecuteSql.xml', string)
		db.execute('DROP TABLE IF EXISTS myTable');
	}

	mcd.test.db.testExecuteSqlWithReturn = function(databaseName, sqlQuery, params, expectedOutput, flag) {
		cleanDB(databaseName);
		db = Ti.Database.open('testDB');
		db.execute('CREATE TABLE IF NOT EXISTS myTable2 (P_Id INT, name TEXT)');
		db.execute('INSERT INTO myTable2 (P_Id,name) VALUES (?,?)', params, expectedOutput);

		var table2 = mcd.db.executeSqlWithReturn(databaseName, sqlQuery, params);

		var result = isEqual(table2.data.row0.name, expectedOutput);
		var error = 'Expected: ' + expectedOutput + '\nActual: ' + table2.data.row0.name + ' \n';

		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>db.executeSqlWithReturn</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('ExecuteSqlWithReturn.xml', string)
		db.execute('DROP TABLE IF EXISTS myTable2');
	}

	mcd.test.db.testDeleteDB = function(databaseName, evt, expectedOutput, flag) {
		cleanDB(databaseName);
		db = Ti.Database.open('testDB');
		var result = false;

		Ti.App.addEventListener('db_del', function() {
		});
		mcd.db.deleteDB(databaseName, evt);
		var dbPath = getDBPath(databaseName);
		dbFile = Ti.Filesystem.getFile(dbPath + databaseName);

		if(dbFile.exists() === expectedOutput) {
			result = true;

		}
		var error = 'Expected: ' + expectedOutput + '\nActual: Does file exist?' + dbFile.exists() + ' \n';

		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>db.deleteDB</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('DeleteDB.xml', string)

	};

	mcd.test.db.testInstallExistingDB = function(dbPath, databaseName, evt, expectedOutput, flag) {

		var result = false;
		mcd.db.installExistingDB(dbPath, databaseName, evt);

		Ti.App.addEventListener(evt, function() {

			var dbPath2;
			var dbFile2;
			if(Ti.Platform.osname == 'android') {
				dbPath2 = 'file:///data/data/' + Ti.App.getID() + '/databases/';
				dbFile2 = Ti.Filesystem.getFile(dbPath2 + databaseName);
			} else {
				dbPath2 = Ti.Filesystem.applicationSupportDirectory + '/database/';
				dbFile2 = Ti.Filesystem.getFile(dbPath2 + databaseName + '.sqlite');
			}

			if(dbFile2.exists()) {
				result = true;
			}
			var error = 'Expected: ' + expectedOutput + '\nActual: Did new database get installed?' + dbFile2.exists() + ' \n';

			var detail = 'SQLite Error';
			var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>db.installExistingDB</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

			if(flag === 1) {
				var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
				alert(alertString);
			} else
				writeMethodFile('InstallExistingDB.xml', string);
			var db2 = Ti.Database.open(databaseName);
			setTimeout(function() {
				db2.remove();
			}, 500);
		});

	}
})();
