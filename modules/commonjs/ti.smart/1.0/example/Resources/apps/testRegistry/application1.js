var mcd = require('mcd.core');/*
 * This script is part of the demo application for the Framework.
 */
(function() {
	var app1 = {};
	var restaurantAddress = "";
	// A call back function that is intended to be used at a registry value change
	function regChangeCallBack(dataKey, dataObj, opt_dataClass) {
		alert("Call Back function \nRegistry Value Change\nKey : " + dataKey + 
				'\nAddress : ' + JSON.stringify(dataObj.address) + 
				 '\nData Class : ' + opt_dataClass.object_class);
	}

	// The selected restaurant name label
	var labelText = "No Restaurant Selected";

	// create two buttons. One sets a restaurant, the other adds a callback function to the registry
	app1.dynamicValueBtn = mcd.ui.createStandardButton('Nearest Restaurant - New York', '10%', '5%', 'auto','90%');
	app1.dynamicValueCallbakBtn = mcd.ui.createStandardButton('Call Back - Restaurant Change','25%', '5%', 'auto', '90%');

	app1.dynamicValueBtn.addEventListener('click', function(e) {

		// set the restaurant information on the registry
		mcd.registry.setDynamicValue('Restaurant', {
			address : '52 FULTON STREET NEW YORK'
		}, {
			object_class : 'My Restaurant',
			object_version : 5,
			object_lc_version : 1
		});

		// update the label with the restaurant information
		restaurantAddress = (mcd.registry.getValue('Restaurant')).data.address;
		app1.dynamicValueLabel.text = 'Selected Restaurant\n' +restaurantAddress;
	});

	// add a callback to the registry
	app1.dynamicValueCallbakBtn.addEventListener('click', function(e) {
		mcd.registry.addCallback('Restaurant', regChangeCallBack);
	});

	// get the registry value.
	var selectedRestaurant = mcd.registry.getValue('Restaurant', {
		object_class : 'My Restaurant',
		object_version : 5,
		object_lc_version : 1
	});
	// if the registry value is available set the label
	if(selectedRestaurant) {
		labelText = 'Selected Restaurant\n' + selectedRestaurant.data.address;
	}

	// create a label to display the restaurant information
	app1.dynamicValueLabel = mcd.ui.createStandardLabel(labelText, '55%', 'left', 2, '100%');

	// create a window to hold the buttons and the label
	var uiObjects = [app1.dynamicValueBtn, app1.dynamicValueCallbakBtn, app1.dynamicValueLabel];
	app1.appWindow = mcd.ui.constructWindow('Application 1', 'singletab', uiObjects);
	app1.appWindow.open();

})();
