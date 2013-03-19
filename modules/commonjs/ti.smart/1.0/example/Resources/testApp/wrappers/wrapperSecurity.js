(function() {
	mcd.test.security = {};
	mcd.test.security.testEncryptStr = function(stringToEncrypt, key, expectedOutput, flag) {

		var encryptedStr = mcd.security.encrypt(stringToEncrypt, key);
		var decryptedStr = mcd.security.decrypt(encryptedStr, key);

		result = isEqual(decryptedStr, expectedOutput);
		var error = 'Expected: ' + expectedOutput + '\nActual: ' + decryptedStr + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>security.encrypt</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('EncryptStr.xml', string);
	}
	mcd.test.security.testDecryptStr = function(stringToEncrypt, key, expectedOutput, flag) {

		var encryptedStr = mcd.security.encrypt(stringToEncrypt, key);

		var decryptedStr = mcd.security.decrypt(encryptedStr, key);

		result = isEqual(decryptedStr, expectedOutput)
		var error = 'Expected: ' + expectedOutput + '\nActual: ' + decryptedStr + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>security.decrypt</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';
		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('DecryptStr.xml', string);

	}
	mcd.test.security.testSetString = function(name, value, key, expectedOutput, flag) {

		mcd.security.setString(name, value, key);
		var str = mcd.security.decrypt(Titanium.App.Properties.getString('My Property'), key);

		var result = isEqual(str, expectedOutput);
		var error = 'Expected: ' + expectedOutput + ' \nActual: ' + str + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>security.setString</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';
		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('SetString.xml', string);
	}
	mcd.test.security.testGetString = function(name, key, expectedOutput, flag) {

		Titanium.App.Properties.setString(name, mcd.security.encrypt(expectedOutput, key));
		var myProp = mcd.security.getString(name, key);

		var result = isEqual(myProp, expectedOutput);
		var error = 'Expected: ' + expectedOutput + '\nActual: ' + myProp + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>security.getString</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';
		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('GetString.xml', string);
	}
})();
