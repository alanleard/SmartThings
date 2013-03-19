
var mcd = require('mcd.core');
// Copyright 2012 McDonald's Corporation. All Rights Reserved.

/**
 * @fileoverview This file is the bootstrap file and the home screen of the restaurant locator sub-application.
 * The file defines the namespace/subnamespaces, includes the dependencies immediately required .
 * 		and launches the screens of the sub-application.
 * @author Virtusa Corporation 2012.
 */

/**
 * @ignore
 * @description Create main restaurant locator app window.
 */
function createResLocator() {
	var resLocAlert;
	/**
	 @ignore
	 @namespace The subnamespace of the restaurant locator application.
	 */
	mcd.app.restaurant = {};

	mcd.services.restaurant.getCurrentAddress('user_location');

	// Retrieve current location of user and assign the value to the 'lblCurLocation' label
	var currentLocation = {};

	/* Heading (Large Label) */
	var lblStandard = mcd.ui.createLargeLabel(L('your_curr_location'), 60, 'center');

	/* Label specifying current location of user (Tint Label) */
	var lblCurLocation = mcd.ui.createTintLabel(L('searching_curr_address'), 80, 'center');

	/* Button to use current address */
	var btnLatLong = mcd.ui.createStandardButton(L('find_near_add'), 115, 50, 30, 220);

	/* Image of map */
	var mapImage = Ti.UI.createView({
		top : mcd.utils.scale(180, 'v'),
		height : mcd.utils.scale(100, 'v'),
		width : mcd.utils.scale(200, 'h'),
		backgroundImage : '/theme/map.png'
	});

	var pinImage = Ti.UI.createView({
		top : mcd.utils.scale(10, 'v'),
		height : mcd.utils.scale(60, 'v'),
		width : mcd.utils.scale(40, 'h'),
		backgroundImage : '/theme/imgPin.png'
	});

	mapImage.add(pinImage);

	/* Label informing user to enter alternate location */
	var lblAltLocation = mcd.ui.createTintLabel(L('find_near_you'), 320, 'center');

	/* Section where user can select number of items to add, and choose to add to meal */
	var addContainer = Ti.UI.createView({
		width : mcd.platform.size.width,
		height : mcd.utils.scale(40, 'v'),
		backgroundColor : mcd.theme.themePrimaryColor,
		layout : 'horizontal'
	});
	addContainer.bottom = mcd.utils.scale(20, 'v');

	/* Input text box for user to enter zip code */
	var txtStandard = mcd.ui.createStandardTextBox(L('enter_zip'), 5, 15, 35, 180);

	/* Button to transmit either current coordinates, or zip code */
	var btnZipcode = mcd.ui.createStandardButton(L('find'), 5, 15, 30, 100);
	btnZipcode.keyboardType = Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION;
	addContainer.add(txtStandard);
	addContainer.add(btnZipcode);

	mcd.ui.handleKeypadInput(txtStandard, addContainer);

	// Create an array of all UIElements need to be in the window
	var uiObjects = [lblStandard, lblCurLocation, btnLatLong, mapImage, lblAltLocation, addContainer];

	/* Main Restaurant Locator window with given title, type and UIObjects arrays */
	mcd.app.restaurant.main = mcd.ui.constructWindow(L('find_restaurant'), 'singletab', uiObjects);
	//Open the constructed window
	mcd.app.restaurant.main.open();

	function getAddressString(e) {
		currentLocation = e;
		if(!currentLocation.error) {
			if(currentLocation.address) {
				var addressString = currentLocation.address.street + ', ' + currentLocation.address.city + ', ' + currentLocation.address.state + ' ' + currentLocation.address.zip;
				Ti.API.info('Retrieved current location object. Latitude: ' + currentLocation.coords.latitude + ' and Longitude: ' + currentLocation.coords.longitude);
				lblCurLocation.text = addressString;
			} else if(currentLocation.coords && currentLocation.coords.latitude && currentLocation.coords.longitude) {
				var tempLat = currentLocation.coords.latitude.toFixed(3);
				var tempLong = currentLocation.coords.longitude.toFixed(3);
				lblCurLocation.text = L('latitude') + ': ' + tempLat + ' ' + L('longitude') + ': ' + tempLong;
				tempLat = null;
				tempLong = null;
			} else {
				lblCurLocation.text = L('gps_error');
			}
		} else {
			if(currentLocation.coords && currentLocation.coords.latitude && currentLocation.coords.longitude) {
				var tempLat = currentLocation.coords.latitude.toFixed(3);
				var tempLong = currentLocation.coords.longitude.toFixed(3);
				lblCurLocation.text = L('latitude') + ': ' + tempLat + ' ' + L('longitude') + ': ' + tempLong;
				tempLat = null;
				tempLong = null;
			} else {
				lblCurLocation.text = L('gps_error');
			}
		}
		Titanium.App.removeEventListener('user_location', getAddressString);
	}


	Titanium.App.addEventListener('user_location', getAddressString);

	/* Create basic window for map/list screen */
	// Create view to host the results (restaurant list or map)
	var mappingView = Ti.UI.createView({
		backgroundImage : mcd.theme.imgPlainBackground,
		backgroundColor : '#000000',
		height : mcd.platform.size.height
	});
	if(mcd.platform.name === 'iphone') {
		mappingView.top = 40;
	} else {
		mappingView.top = 0;
	}

	var winRestaurants = mcd.ui.constructWindow(L('restaurants_nearby'), 'singletab', []);

	btnLatLong.addEventListener('click', function(e) {
		if(Ti.Platform.osname === 'android') {
			mcd.constant.CURRENT_WINDOW = mcd.app.restaurant.main;
		} else if(Ti.Platform.osname === 'iphone') {
			mcd.constant.CURRENT_WINDOW = mcd.app.restaurant.main.activeTab.window;
		}

		// Remove textbox keyboard, if visible
		txtStandard.blur();

		// Construct parameters to be sent to getRestaurants service
		var params = {};
		if(currentLocation.coords && currentLocation.coords.latitude && currentLocation.coords.longitude) {
			params.latitude = currentLocation.coords.latitude;
			params.longitude = currentLocation.coords.longitude;
			mcd.services.restaurant.getRestaurants(params, 'ResturantLocator', 'GetLocations', 'got_res');
			createListMapView(winRestaurants, mappingView, currentLocation, 'latlong');
		} else {
			var msg = L('gps_error') + ' ' + L('try_zip');
			resLocAlert = mcd.ui.createAlert(msg);
			resLocAlert.show();
		}

	});

	btnZipcode.addEventListener('click', function(e) {
		txtStandard.blur();
		if(Ti.Platform.osname === 'android') {
			mcd.constant.CURRENT_WINDOW = mcd.app.restaurant.main;
		} else if(Ti.Platform.osname === 'iphone') {
			mcd.constant.CURRENT_WINDOW = mcd.app.restaurant.main.activeTab.window;
		}
		// Construct parameters to be sent to getRestaurants service
		var params = {};

		// If user has entered zip code, give priority to that
		if(txtStandard.value) {
			var userZipcode = txtStandard.value;
			Ti.API.info('User entered zipcode: ' + userZipcode);
			params.zipcode = txtStandard.value;

			// Obtain information regarding nearby restaurants
			if(mcd.network.checkNetworkConnection()) {
				mcd.services.restaurant.getRestaurants(params, 'ResturantLocator', 'GetLocations', 'got_res');
				createListMapView(winRestaurants, mappingView, currentLocation);
			} else {
				var alt = mcd.ui.createAlert('Network Connection Not Available');
				alt.show();
			}
		} else {
			alert(L('noenter_zip'));
		}
	});
}
