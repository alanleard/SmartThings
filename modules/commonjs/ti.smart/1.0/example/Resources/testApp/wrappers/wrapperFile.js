(function() {
	mcd.test.file = {};

	mcd.test.file.testCheckFileExistence = function(filePath, fileName, expectedOutput, flag) {

		var testCheckFileExistence = mcd.file.checkFileExistence(filePath, fileName);
		var result = isEqual(expectedOutput, testCheckFileExistence);
		var error = 'Expected: ' + expectedOutput + '\nActual: File existence=' + testCheckFileExistence + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>file.checkFileExistence</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('CheckFileExistence.xml', string);
	}

	mcd.test.file.testWriteToFile = function(filePath, fileName, content, expectedOutput, flag) {
		var result = false;
		mcd.file.writeToFile(filePath, fileName, content);
		var f3 = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, fileName);
		var cont = f3.read().text;
		result = isEqual(cont, expectedOutput);

		var error = 'Expected: ' + expectedOutput + '\nActual: ' + cont + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>file.writeToFile</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else

			writeMethodFile('WriteToFile.xml', string);
	}

	mcd.test.file.testAppendToFile = function(filePath, fileName, content, existingContent, expectedOutput, flag) {
		var result = false;
		mcd.file.writeToFile(filePath, fileName, existingContent);
		mcd.file.appendToFile(filePath, fileName, content);
		var f4 = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, fileName);
		var cont = f4.read().text;

		result = isEqual(cont, expectedOutput);
		var error = 'Expected: ' + expectedOutput + '\nActual: ' + cont + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>file.appendToFile</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else

			writeMethodFile('AppendToFile.xml', string);
	}

	mcd.test.file.testReadFromFile = function(filePath, fileName, expectedOutput, flag) {

		var file = mcd.file.readFromFile(filePath, fileName);
		var cont = file.content;
		result = isEqual(cont, expectedOutput);

		var error = 'Expected: ' + expectedOutput + '\nActual: ' + cont + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>file.readFromFile</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('ReadFromFile.xml', string);
	}
	mcd.test.file.testCheckAvailableSpace = function(expectedOutput, flag) {
		var space = mcd.file.checkAvailableSpace();

		var result = isNum(space);

		var error = 'Expected: Available space is a numeric value' + expectedOutput + '\nActual: Avalailable space is=' + space + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>file.checkAvailableSpace</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('CheckAvailableSpace.xml', string);
	}
})();
