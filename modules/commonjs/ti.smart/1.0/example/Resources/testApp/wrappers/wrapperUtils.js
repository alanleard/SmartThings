(function() {
	mcd.test.utils = {};

	mcd.test.utils.testLimitInput = function(textfield, numLimit, expectedOutput, flag) {

		mcd.utils.limitInput(textfield, numLimit);
		mcd.utils.limitInput(textfield, numLimit);
		textfield.setValue(44444444);
		var result = isEqual(expectedOutput, textfield.value);

		var error = 'Expected: ' + expectedOutput + '\nActual: ' + textfield.value + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>utils.limitInput</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';
		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('LimitInput.xml', string);
	}
	mcd.test.utils.testForceNumeric = function(textfield, expectedOutput, flag) {
		mcd.utils.forceNumeric(tf);
		textfield.setValue('b1');

		var result = isEqual(expectedOutput, textfield.value);
		var error = 'Expected: ' + expectedOutput + '\nActual: ' + textfield.value + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>utils.forceNumeric</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('ForceNumeric.xml', string);

	}
	mcd.test.utils.testCleanTelNumber = function(rawTelNumber, expectedOutput, flag) {
		var testCleanTelNumber = mcd.utils.cleanTelNumber(rawTelNumber);
		var result = isEqual(expectedOutput, testCleanTelNumber);
		var error = 'Expected: ' + expectedOutput + '\nActual: ' + testCleanTelNumber + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>utils.cleanTelNumber</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('CleanTelNumber.xml', string);
	}
	mcd.test.utils.testIsBoolean = function(testInput, opt_warn, expectedOutput, flag) {
		var testIsBoolean = mcd.utils.isBoolean(testInput, opt_warn);
		var result = isEqual(expectedOutput, testIsBoolean);
		var error = 'Expected: ' + expectedOutput + '\nActual: ' + testIsBoolean + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>utils.isBoolean</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('IsBoolean.xml', string);
	}
	mcd.test.utils.testIsNull = function(testInput, opt_warn, expectedOutput, flag) {
		var testIsNull = mcd.utils.isNull(testInput, opt_warn);
		var result = isEqual(expectedOutput, testIsNull);
		var error = 'Expected: ' + expectedOutput + '\nActual: ' + testIsNull + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>utils.isNull</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('IsNull.xml', string);
	}
	mcd.test.utils.testIsNumber = function(testInput, opt_warn, expectedOutput, flag) {
		var testIsNumber = mcd.utils.isNumber(testInput, opt_warn);
		var result = isEqual(expectedOutput, testIsNumber);
		var error = 'Expected: ' + expectedOutput + '\nActual: ' + testIsNumber + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>utils.isNumber</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('IsNumber.xml', string);
	}
	mcd.test.utils.testIsString = function(testInput, opt_warn, expectedOutput, flag) {
		var testIsString = mcd.utils.isString(testInput, opt_warn);
		var result = isEqual(expectedOutput, testIsString);
		var error = 'Expected: ' + expectedOutput + '\nActual: ' + testIsString + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>utils.isString</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + detail;
			alert(alertString);
		} else
			writeMethodFile('IsString.xml', string);
	}
	mcd.test.utils.testIsValidEmail = function(emailAddress, opt_warn, expectedOutput, flag) {
		var testIsValidEmail = mcd.utils.isValidEmail(emailAddress, opt_warn);
		var result = isEqual(expectedOutput, testIsValidEmail);
		var error = 'Expected: ' + expectedOutput + '\nActual: ' + testIsValidEmail + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>utils.isValidEmail</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('IsValidEmail.xml', string);
	}
	mcd.test.utils.testIsValidUSZipCode = function(zipCode, opt_warn, expectedOutput, flag) {
		var testIsValidUSZipCode = mcd.utils.isValidUSZipCode(zipCode, true);
		var result = isEqual(expectedOutput, testIsValidUSZipCode);
		var error = 'Expected: ' + expectedOutput + '\nActual: ' + testIsValidUSZipCode + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>utils.isValidUSZipCode</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('IsValidUSZipCode.xml', string);
	}
	mcd.test.utils.testIsValidWebAddress = function(webAddress, opt_warn, expectedOutput, flag) {
		var testIsValidWebAddress = mcd.utils.isValidWebAddress(webAddress, opt_warn);
		var result = isEqual(expectedOutput, testIsValidWebAddress);
		var error = 'Expected: ' + expectedOutput + '\nActual: ' + testIsValidWebAddress + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>utils.isValidWebAddress</name>\n' + '<pass>' + result + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = result ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('IsValidWebAddress.xml', string);
	}
	mcd.test.utils.testScale = function(numToScale, positioning, expectedOutput, flag) {
		var testScaleV = mcd.utils.scale(numToScale, positioning);

		var resultV = isEqual(expectedOutput, testScaleV);

		var error = 'Expected: ' + expectedOutput + '\nActual: ' + testScaleV + ' \n';
		var detail = '';
		var string = '<?xml version="1.0" encoding="UTF-8"?>\n<method>\n' + '<name>utils.scale</name>\n' + '<pass>' + resultV + '</pass>\n<detail>' + error + detail + '</detail>\n' + '</method>\n';

		if(flag === 1) {
			var alertString = resultV ? 'Passed' : 'Failed \n' + error + detail;
			alert(alertString);
		} else
			writeMethodFile('Scale.xml', string);
	}
})();
