(function() {
	mcd.test.location = {};
	mcd.test.location.testSetPurpose = function(purpose, expectedOutput, flag) {
		var prev = Ti.Geolocation.purpose;
		mcd.location.setPurpose(purpose);
		var result = false;
		var detail = '';
		var string = '';
		var error = '';

		if(Ti.Geolocation.purpose === expectedOutput) {
			result = true;

			error = 'Expected: ' + expectedOutput + ' \nActual: ' + Ti.Geolocation.purpose + ' \n';
			string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>location.setPurpose</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';
		} else if(Ti.Geolocation.purpose === prev) {
			result = false;
			detail = 'Note: Timing issues may alter the Ti.Geolocation.purpose because functions in mcd.services.restaurant sets this parameter aswell';
			error = 'Expected: ' + expectedOutput + ' \nActual: ' + Ti.Geolocation.purpose + ' \n';
			string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>location.setPurpose</name>\n' + '<pass>' + 'scope' + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';
		} else {
			result = false;
			detail = 'Framework error';
			error = 'Expected: ' + expectedOutput + ' \nActual: ' + Ti.Geolocation.purpose + ' \n';
			string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>location.setPurpose</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		}

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else {

			writeMethodFile('SetPurpose.xml', string);
		}

	}
	mcd.test.location.testCreateAnnotation = function(location, expectedOutput, flag) {
		var result = false;
		var detail = '';

		var ant2 = mcd.location.createAnnotation(location);
		if((ant2.latitude === expectedOutput.coords.latitude) && (ant2.longitude === expectedOutput.coords.longitude) && (ant2.subtitle === expectedOutput.address.street + ', ' + expectedOutput.address.city) && (ant2.title === expectedOutput.name))
			result = true;
		var actualValStr = ant2.latitude + ',' + ant2.longitude + ',' + ant2.subtitle + ',' + ant2.title;
		var expectedValsStr = expectedOutput.coords.latitude + ',' + expectedOutput.coords.longitude + ',' + expectedOutput.address.street + ', ' + expectedOutput.address.city + ',' + expectedOutput.name;
		var error = 'Expected: ' + expectedValsStr + ' \nActual: ' + actualValStr + ' \n';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>location.createAnnotation</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('CreateAnnotation.xml', string);
	}
	mcd.test.location.testGetAddress = function(location, evt, expectedOutput, flag) {

		function getAdd(e) {
			var result = false;
			var string;
			var error = '';
			if(!(Ti.Network.online)) {
				var detail = 'No network';
				result = false;

				string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>location.getAddress</name>\n' + '<pass>' + 'scope' + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';
				error = 'Expected: ' + expectedOutput.address.street + ',' + expectedOutput.address.city + ' \nActual: no data \n';
			} else if(e.error && e.error === 'Unable to retrieve position information') {
				var detail = 'Unable to retieve position information';
				result = false;
				error = 'Expected: ' + expectedOutput.address.street + ',' + expectedOutput.address.city + ' \nActual: no data \n';
				string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>location.getAddress</name>\n' + '<pass>' + 'scope' + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

			} else if((e.address.street && e.address.street === expectedOutput.address.street) && (e.address.city && e.address.city === expectedOutput.address.city)) {
				result = true;
				var detail = '';
				error = 'Expected: ' + expectedOutput.address.street + ',' + expectedOutput.address.city + ' \nActual: ' + e.address.street + ',' + e.address.city + ' \n';
				string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>location.getAddress</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

			} else {
				result = false;
				var detail = 'Framework error';
				error = 'Expected: ' + expectedOutput.address.street + ',' + expectedOutput.address.city + ' \nActual: ' + e + ' \n';
				string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>location.getAddress</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';
			}
			if(flag === 1) {
				var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
				alert(alertString);
			} else
				writeMethodFile('GetAddress.xml', string);

			Ti.App.removeEventListener(evt, getAdd);

		}


		Ti.App.addEventListener(evt, getAdd);
		if(Ti.Network.online)
			mcd.location.getAddress(location, evt);
		else {
			var error = '';
			result = false;
			error = 'Expected: ' + expectedOutput.address.street + ',' + expectedOutput.address.city + ' \nActual: no data \n';
			var detail = '';
			var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>location.getAddress</name>\n' + '<pass>' + 'scope' + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';
			if(flag === 1) {
				var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
				alert(alertString);
			} else
				writeMethodFile('GetAddress.xml', string);

		}

	}

	mcd.test.location.testGetPosition = function(evt, expectedOutput, flag) {
		function getPos(e) {
			var result = false;
			var string;
			var error = '';
			if(e.error && e.error === 'Unable to retrieve position information') {
				result = false;
				var detail = 'Unable to retrieve position information';
				error = 'Expected: type of latitude=' + expectedOutput + ' and type of longitude=' + expectedOutput + ' \nActual: no data \n';
				string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>location.getPosition</name>\n' + '<pass>' + 'scope' + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

			} else if(e.coords.latitude && e.coords.longitude && ( typeof e.coords.latitude != 'undefined') && ( typeof e.coords.longitude != 'undefined')) {
				result = true;
				var detail = '';
				error = 'Expected: type of latitude=' + expectedOutput + ' and type of longitude=' + expectedOutput + ' \nActual: type of latitude=' + typeof e.coords.latitude + ' and type of longitude' + typeof e.coords.longitude + ' \n';
				string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>location.getPosition</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

			} else {
				result = false;
				var detail = 'Framework error';
				error = 'Expected: type of latitude=' + expectedOutput + ' and type of longitude=' + expectedOutput + ' \nActual: ' + e + ' \n';
				string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>location.getPosition</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';
			}

			if(flag === 1) {
				var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
				alert(alertString);
			} else
				writeMethodFile('GetPosition.xml', string);
			Ti.App.removeEventListener(evt, getPos);
		}


		Ti.App.addEventListener(evt, getPos);

		mcd.location.getPosition(evt);

	}
})();
