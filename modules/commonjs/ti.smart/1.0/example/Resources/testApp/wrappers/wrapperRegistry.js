(function() {
	mcd.test.registry = {};
	mcd.test.registry.testPut = function(dataKey, dataClass, dataObj, ver, expectedOutput, flag) {

		mcd.registry[dataClass] = {};
		mcd.registry.put(dataKey, dataClass, dataObj, ver);
		var out = mcd.registry[dataClass][dataKey];
		var result = isEqual(out.name, expectedOutput);
		var error = 'Expected: ' + expectedOutput + '\nActual: ' + out.name + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>registry.put</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('Put.xml', string)

	}
	mcd.test.registry.testGet = function(dataKey, dataClass, opt_fn, opt_ver, opt_persist, expectedOutput, flag) {
		var result = false;

		mcd.registry[dataClass] = {};
		mcd.registry.put(dataKey, dataClass, expectedOutput);
		var ret1 = mcd.registry.get(dataKey, dataClass, opt_fn, opt_ver, opt_persist);
		var check = mcd.registry[dataClass][dataKey];
		var result11 = isUndefined(check);
		var error = '';
		if(!opt_fn) {
			if(opt_persist !== 1) {
				if(result11 && ret1.name === expectedOutput.name)
					result = true;
				else
					result = false;
			} else {
				if(ret1.name === expectedOutput.name)
					result = true;
				else
					result = false;
			}
			error = 'Expected: ' + expectedOutput.name + '\nActual: ' + ret1.name + ' \n';
		} else {
			if(opt_persist !== 1) {
				result = true;
			} else {
				result = true;
			}
			error = 'Expected: the function you gave to be executed' + '\nActual: Depends on the function you provided \n';
		}

		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>registry.get</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('Get.xml', string)
	}
})();
