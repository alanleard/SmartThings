(function() {
	mcd.test.restaurant = {};
	mcd.test.restaurant.testCreateAnnotations = function(mapObj, expectedOutput1, expectedOutput2, flag) {

		var ant1 = [];
		ant1 = mcd.services.restaurant.createAnnotations(mapObj);

		var result = false

		if(ant1[0].latitude === expectedOutput1 && ant1[0].longitude === expectedOutput2)
			result = true;
		else
			result = false;

		var error = 'Expected: ' + expectedOutput1 + ',' + expectedOutput2 + '\nActual: ' + ant1[0].latitude + ',' + ant1[0].longitude + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>services.restaurant.createAnnotations</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';
		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('CreateAnnotations.xml', string);
	}

	mcd.test.restaurant.testLocateUser = function(evt, expectedOutput1, expectedOutput2, flag) {

		function locUser(e) {
			var detail = '';
			var string = '';
			var result = false;
			if(e.error && e.error === 'Unable to retrieve position information') {
				result = false;
				var error = 'Expected: ' + expectedOutput1 + ',' + expectedOutput2 + '\nActual: No data \n';
				detail = 'Unable to retrieve position information';
				string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>services.restaurant.locateUser</name>\n' + '<pass>' + 'scope' + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

			} else if(e.coords.latitude && e.coords.longitude && ( typeof e.coords.latitude != 'undefined') && ( typeof e.coords.longitude != 'undefined')) {
				result = true;
				var error = 'Expected: ' + expectedOutput1 + ',' + expectedOutput2 + '\nActual: ' + e.coords.latitude + ',' + e.coords.longitude + ' \n';
				string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>services.restaurant.locateUser</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

			} else {
				result = false;
				var error = 'Expected: ' + expectedOutput1 + ',' + expectedOutput2 + '\nActual: ' + e + ' \n';
				detail = 'Framework error';
				string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>services.restaurant.locateUser</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';
			}
			if(flag === 1) {
				var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
				alert(alertString);
			} else
				writeMethodFile('LocateUser.xml', string);
			Ti.App.removeEventListener(evt, locUser);
		}


		Ti.App.addEventListener(evt, locUser);
		mcd.services.restaurant.locateUser(evt);

	}
	mcd.test.restaurant.testGetCurrentAddress = function(flag) {

		function getAdd(e) {
			alert('get current add' + e.error);
			var detail = '';
			var string = '';
			var result = false;
			if(e.error === 'Unable to retrive position information') {
				result = false;
				var error = 'Expected: ' + expectedOutput1 + ',' + expectedOutput2 + '\nActual: no data \n';
				detail = 'Unable to retrieve position information';
				string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>services.restaurant.getCurrentAddress</name>\n' + '<pass>' + 'scope' + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

			} else {
				result = false;
				var error = 'Expected: ' + expectedOutput1 + ',' + expectedOutput2 + '\nActual: ' + e + ' \n';
				detail = 'Framework error';
				string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>services.restaurant.getCurrentAddress</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';
			}

			if(flag === 1) {
				var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
				alert(alertString);
			} else
				writeMethodFile('GetCurrentAddress.xml', string);

			Ti.App.removeEventListener('getAdd', getAdd);

		}


		Ti.App.addEventListener('getAdd', getAdd);
		mcd.services.restaurant.getCurrentAddress('getAdd');
	}

	mcd.test.restaurant.testGetRestaurants = function(flag) {
		var params = {
			latitude : 37.422502,
			longitude : -122.0855498
		}
		mcd.services.restaurant.getRestaurants(params, "ResturantLocator", "GetLocations", 'got_res');
		Ti.App.addEventListener('got_res', function(e) {
			alert('get res: ' + e.data)
		});
	}
})();
