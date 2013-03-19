(function() {
	mcd.test.network = {};
	mcd.test.network.testCheckNetworkConnection = function(expectedOutput, flag) {
		var testNetworkConnection = mcd.network.checkNetworkConnection();

		var result = isEqual(testNetworkConnection, expectedOutput);
		var error = 'Expected: ' + expectedOutput + '\nActual: ' + testNetworkConnection + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>network.checkNetworkConnection</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';
		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('CheckNetworkConnection.xml', string);
	}
	mcd.test.network.testGetNetworkType = function(expectedOutput, flag) {
		var testGetNetworkType = mcd.network.getNetworkType();
		var result = isEqual(testGetNetworkType, expectedOutput);
		var error = 'Expected: ' + expectedOutput + '\nActual: ' + testGetNetworkType + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>network.getNetworkType</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';
		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('GetNetworkType.xml', string);
	}
})();
