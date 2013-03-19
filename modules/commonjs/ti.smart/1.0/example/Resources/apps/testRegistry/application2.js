var mcd = require('mcd.core');
/*
 * This script is part of the demo application for the Framework.
 */
(function() {
	var app2 = {};
	var labelText = "No Restaurant Selected";
	var restaurantAddress = "";

	// create two buttons to set the restaurant
	app2.dynamicValueBtn1 = mcd.ui.createStandardButton('Nearest Restaurant - Washington','10%', '5%', 'auto', '90%');
	app2.dynamicValueBtn2 = mcd.ui.createStandardButton('Nearest Restaurant - Dallas','25%', '5%', 'auto', '90%');
	
	// create a button to get an incompatible version 
	app2.dynamicValueBtn3 = mcd.ui.createStandardButton('Get incompatible version', '40%', '5%', 'auto', '90%');

	app2.dynamicValueBtn1.addEventListener('click', function(e) {
		//set the restaurant information on the registry
		mcd.registry.setDynamicValue('Restaurant', {
			address : '750 17TH ST NW, WASHINGTON DC'
		}, {
			object_class : 'My Restaurant',
			object_version : 5,
			object_lc_version : 1
		});
		// update the label with the restaurant information
		restaurantAddress = (mcd.registry.getValue('Restaurant')).data.address;
		app2.dynamicValueLabel.text = 'Selected Restaurant\n' + restaurantAddress;
	});

	app2.dynamicValueBtn2.addEventListener('click', function(e) {

		// set the restaurant information on the registry
		mcd.registry.setDynamicValue('Restaurant', {
			address : '1000 COMMERCE ST, DALLAS TX'
		}, {
			object_class : 'My Restaurant',
			object_version : 5,
			object_lc_version : 1
		});
		// update the label with the restaurant information
		restaurantAddress = (mcd.registry.getValue('Restaurant')).data.address;
		app2.dynamicValueLabel.text = 'Selected Restaurant\n' + restaurantAddress;
	});

	app2.dynamicValueBtn3.addEventListener('click', function(e) {
		var iRestaurant = mcd.registry.getValue('Restaurant', {
			object_class : 'My Restaurant',
			object_version : 6
		});
		// get incompatible restaurant
		
		
		if(!iRestaurant){
			alert("The expected Restaurant version not available");
			// update the label with the restaurant information.
			app2.dynamicValueLabel.text = 'Expecting different Restaurant version\n' ;
		}
		else{
			app2.dynamicValueLabel.text = 'Selected Restaurant\n' + iRestaurant.data.address;
		}
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
	app2.dynamicValueLabel = mcd.ui.createStandardLabel(labelText, '55%', 'left', 2, '100%');

	// create a window to hold the buttons and the label
	var uiObjects = [app2.dynamicValueBtn1, app2.dynamicValueBtn2, app2.dynamicValueBtn3, app2.dynamicValueLabel];
	app2.appWindow = mcd.ui.constructWindow('Application 2', 'singletab', uiObjects);
	app2.appWindow.open();

})();
