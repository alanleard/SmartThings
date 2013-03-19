var mcd = require('mcd.core');
(function() {
	
	/*
	 * @ignore
	 *Internal function - Not exposed to the developer
	 * This function compares the class names, versions and the least compatible version numbers and
	 * returns true if all the values match, else returns false
	 */

	function compareRegistryVersions(obj1, obj2){
		
		if(obj1.object_class === obj2.object_class && 
				obj1.object_version === obj2.object_version && 
					obj1.object_lc_version === obj2.object_lc_version){
						return 1;
					}
		else return 0;
	}
	/*
	 * defines two test objects to be tested under unit testing
	 */
	var regObj1 = {
		name : "test Register object 1"
	};

	var regObj2 = {
		name : "test Register object 2"
	};
	/*
	 * The test parameters array.
	 * This array defines a set of input parameters for the tests and a set of expected output parameters
	 */
	var testRegistryValues = 
	[{		// first set of input parameters and expected output parameters
			input : ["DataKey01", "DataA", {object_class : 'ClassA',
											object_version : 5,
											object_lc_version : 1}],
			output : ["DataA"]},
			
			// second set of input parameters and expected output parameters
			{
			input : ["DataKey02", "DataB", {object_class : 'ClassB',
											object_version : 10,
											object_lc_version : 1}],
			output : ["DataB"]}, 
			
			// third set of input parameters and expected output parameters
			{
			input : ["DataKey03", regObj1, {object_class : 'ClassC',
											object_version : 15,
											object_lc_version : 1}],
			output : [regObj1]},
			
			// fourth set of input parameters and expected output parameters
			{
			input : ["DataKey04", regObj2, {object_class : 'ClassD',
											object_version : 20,
											object_lc_version : 1}],
			output : [regObj2]
	}];
	// used to count the pass and fail instances.
	var pass = 0;
	var fail = 0;

	// used to save the unit test results.
	var statusStr = "";

	// save the return value from a mcd.registry.getValue()
	var returnValue = "";


	for(var i = 0; i < testRegistryValues.length; i++) {

		// select a set of input parameters from the array
		var input = testRegistryValues[i].input;

		// select a set of input parameters from the array
		var output = testRegistryValues[i].output;

		var isSet = "";

		// used to save the classObject returned by mcd.registry.getClassVersion()
		var regClassVersion = "";
		var regVersion = "";

		/*
		* Test Dynamic Registry value function
		*/

		// set a dynamic value
		mcd.registry.setDynamicValue('Dynamic' + input[0], input[1], input[2]);
		returnValue = mcd.registry.getValue('Dynamic' + input[0], input[2]);

		// compare the return value with the expected output
		if(returnValue.data === output[0]) {
			statusStr = statusStr + ' *setDynamicValue () : Pass \n';
			pass++;
		} else {
			statusStr = statusStr + ' *setDynamicValue () Fail for Input values ' + input[0] + "," + input[1] + "," + input[2] +'\n';
			fail++;
		}

		//  testing isSet()//
		isSet = mcd.registry.isSet('Dynamic' + input[0], input[2]);
		if(isSet) {
			statusStr = statusStr + ' *isSet() - Dynamic : Pass \n';
			pass++;
		} else {
			statusStr = statusStr + ' *isSet() - Dynamic : Fail \n';
			fail++;
		}

		//  testing getClassVersion() //
		regClassVersion = mcd.registry.getClassVersion('Dynamic' + input[0]);
		
		if(regClassVersion && compareRegistryVersions(regClassVersion,input[2])) {
			statusStr = statusStr + ' *getClassVersion() - Dynamic : Pass \n';
			pass++;
		}
		else{
			statusStr = statusStr + ' *getClassVersion() - Dynamic : Fail \n';
			fail++;
		}
		regVersion = mcd.registry.getVersion('Dynamic' + input[0]);
		if(regVersion === input[2].object_version) {
			statusStr = statusStr + ' *getVersion() - Dynamic : Pass \n';
			pass++;
		} else {
			statusStr = statusStr + ' *getVersion() - Dynamic : Fail \n';
			fail++;
		}

		// testing deleteValue() //
		mcd.registry.deleteValue('Dynamic' + input[0]);
		returnValue = mcd.registry.getValue('Dynamic' + input[0]);
		if(!returnValue) {
			statusStr = statusStr + ' *deleteValue() - Dynamic : Pass \n';
			pass++;
		} else {
			statusStr = statusStr + ' *deleteValue() - Dynamic : Fail \n';
			fail++;
		}
		/*
		 * Test Persistent Registry value function
		 */
		mcd.registry.setPersistentValue('Persistent' + input[0], input[1], input[2]);
		returnValue = mcd.registry.getValue('Persistent' + input[0], input[2]);

		// compare the return value with the expected output
		if(JSON.stringify(returnValue.data) === JSON.stringify(output[0])) {
			statusStr = statusStr + ' *setPersistentValue () : Pass \n';
			pass++;
		} else {
			statusStr = statusStr + ' *setPersistentValue () Fail for Input values ' + input[0] + "," + input[1] + "," + input[2] + '\n';
			fail++;
		}

		// testing isSet() //
		isSet = mcd.registry.isSet('Persistent' + input[0]);
		if(isSet) {
			statusStr = statusStr + ' *isSet() - Persistent : Pass \n';
			pass++;
		} else {
			statusStr = statusStr + ' *isSet() - Persistent : Fail \n';
			fail++;
		}

		// testing getClassVersion() //
		regClassVersion = mcd.registry.getClassVersion('Persistent' + input[0]);
		if(regClassVersion && compareRegistryVersions(regClassVersion,input[2])) {
			statusStr = statusStr + ' *getClassVersion() - Persistent : Pass \n';
			pass++;
		}
		else  {
			statusStr = statusStr + ' *getClassVersion() - Persistent : Fail \n';
			fail++;
		}

		regVersion = mcd.registry.getVersion('Persistent' + input[0]);
		if(regVersion === input[2].object_version) {
			statusStr = statusStr + ' *getVersion() - Persistent : Pass \n';
			pass++;
		} else {
			statusStr = statusStr + ' *getVersion() - Persistent : Fail \n';
			fail++;
		}

		// testing deleteValue() //
		mcd.registry.deleteValue('Persistent' + input[0]);
		returnValue = mcd.registry.getValue('Persistent' + input[0]);
		if(!returnValue) {
			statusStr = statusStr + ' *deleteValue() - Persistent : Pass \n';
			pass++;
		} else {
			statusStr = statusStr + ' *deleteValue() - Persistent : Fail \n';
			fail++;
		}

		/*
		 * Test Read Only Registry value function
		 */
		mcd.registry.setReadOnlyValue('ReadOnly' + input[0], input[1], input[2]);
		returnValue = mcd.registry.getValue('ReadOnly' + input[0], input[2]);

		// compare the return value with the expected output
		if(JSON.stringify(returnValue.data) === JSON.stringify(output[0])) {
			statusStr = statusStr + ' *setReadOnlyValue () : Pass \n';
			pass++;
		} else {
			statusStr = statusStr + ' *setReadOnlyValue () Fail for Input values ' + input[0] + "," + input[1] + "," + input[2] + '\n';
			fail++;
		}

		// testing isSet() //
		isSet = mcd.registry.isSet('ReadOnly' + input[0], input[2]);
		if(isSet) {
			statusStr = statusStr + ' *isSet() - ReadOnly : Pass \n';
			pass++;
		} else {
			statusStr = statusStr + ' *isSet() - ReadOnly : Fail \n';
			fail++;
		}

		// check if the class objects match. (returned class objects Vs expected class Objects)
		regClassVersion = mcd.registry.getClassVersion('ReadOnly' + input[0]);
		if(regClassVersion && compareRegistryVersions(regClassVersion,input[2])) {
			statusStr = statusStr + ' *getClassVersion() - ReadOnly : Pass \n';
			pass++;
		} else {
			statusStr = statusStr + ' *getClassVersion() - ReadOnly : Fail \n' + 'ReadOnly' + input[0];
			fail++;
		}

		//trying to override a ReadOnly value with a Dynamic Values
		mcd.registry.setDynamicValue('ReadOnly' + input[0], "Override", input[2]);
		returnValue = mcd.registry.getValue('ReadOnly' + input[0], input[2]);

		// compare the return value with the expected output
		if(JSON.stringify(returnValue.data) === JSON.stringify(output[0])) {
			statusStr = statusStr + ' *setReadOnlyValue () : Pass \n';
			pass++;
		} else {
			statusStr = statusStr + ' *setReadOnlyValue () Fail for Input values ' + 'ReadOnly' + input[0] + "," + "TestOverride" + "," + input[2] + '\n';
			fail++;
		}

		regVersion = mcd.registry.getVersion('ReadOnly' + input[0]);
		if(regVersion === input[2].object_version) {
			statusStr = statusStr + ' *getVersion() - ReadOnly : Pass \n';
			pass++;
		} else {
			statusStr = statusStr + ' *getVersion() - ReadOnly : Fail \n';
			fail++;
		}

		// Try to remove read only values
		mcd.registry.deleteValue('ReadOnly' + input[0]);
		returnValue = mcd.registry.getValue('ReadOnly' + input[0]);
		if(returnValue) {
			statusStr = statusStr + ' *deleteValue() - ReadOnly : Pass \n';
			pass++;
		} else {
			statusStr = statusStr + ' *deleteValue() - ReadOnly : Fail \n';
			fail++;
		}
		statusStr = statusStr + '\n';
	}

	// calculate unit test pass ratio
	var passRatio = pass / (pass + fail);
	passRatio = parseFloat(passRatio.toPrecision(3));

	//Test results
	var resultStr = "Total Tests : " + (pass + fail) + 
						 "\nPass : " + pass + 
						 "\nFail : " + fail + 
						 "\nPass Ratio : " + passRatio * 100 + "%";

	resultStr = 'Registry Test Results\n\n' + resultStr + "\n\n Detalied Results\n" + statusStr;

	/*
	 * Construct the window, label, view to display the Registry Results
	 */
	var testResultWindow = mcd.ui.constructWindow('Unit Tests', 'singletab', []);

	var testResultView = Ti.UI.createScrollView({
		contentHeight : 'auto',
		showVerticalScrollIndicator : true,
		top : '10%',
		height : '90%',
		width : '95%',
		layout : 'vertical',
		backgroundColor : '#FFF'
	});
	var testResultsLabel = Ti.UI.createLabel({
		text : resultStr,
		top : 0,
		color : 'black'
	});

	testResultView.add(testResultsLabel);
	testResultWindow.add(testResultView);
	testResultWindow.open();

})();
