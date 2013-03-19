var mcd = require('mcd.core');
/**
 * @ignore
 * @description Create modal window with restaurant details.
 * The window is broought up when a restaurant on a lsit/map is clicked.
 * The window contains details regarding the restaurant location,
 * contact information, and facilities.
 * @param {object} data Object containing restaurant details.
 * @return {window} Window containing restaurant details.
 */
var createResDetail = function(data) {
	/* Main view/background  */
	var resDetails = Titanium.UI.createView({
		top : mcd.utils.scale(20, 'v'),
		height : mcd.utils.scale(200, 'v'),
		left : mcd.utils.scale(20, 'h'),
		right : mcd.utils.scale(20, 'h'),
		borderRadius : 8,
		borderColor : mcd.theme.themePrimaryColor,
		backgroundColor : '#FBEDD9',
		backgroundImage : mcd.theme.tableBackground
	});

	/* McDonald's logo */
	var mcSign = Ti.UI.createView({
		top : mcd.utils.scale(5, 'v'),
		right : 0,
		height : mcd.utils.scale(110, 'v'),
		width : mcd.utils.scale(110, 'h'),
		backgroundImage : '/theme/sign_board.png'
	});
	resDetails.add(mcSign);

	/* McDonald's label */
	var mcLabel = mcd.ui.createLargeLabel('McDonald\'s', 20, 'left', 10);
	mcLabel.color = mcd.theme.themePrimaryColor;
	resDetails.add(mcLabel);

	/* Address of restaurant */
	var resAddress = mcd.ui.createStandardLabel('', 55, 'left', 10);
	resAddress.color = '#81734D';
	resAddress.font = {
		fontSize : mcd.utils.scale(14, 'h')
	};
	resAddress.width = mcd.utils.scale(170, 'h');
	resAddress.height = mcd.utils.scale(20, 'v');
	resDetails.add(resAddress);

	/* City where restaurant is located */
	var resCity = mcd.ui.createStandardLabel('', 75, 'left', 10);
	resCity.color = '#81734D';
	resCity.font = {
		fontSize : mcd.utils.scale(14, 'h')
	};
	resDetails.add(resCity);

	/* Non-functional icon of phone/call */
	var callIcon = Ti.UI.createLabel({
		height : mcd.utils.scale(35, 'v'),
		left : mcd.utils.scale(15, 'h'),
		width : mcd.utils.scale(45, 'h'),
		top : mcd.utils.scale(105, 'v'),
		backgroundImage : '/theme/phone.png'
	});
	resDetails.add(callIcon);

	/* Label showing phone number of restaurant */
	var resPhone = mcd.ui.createLargeLabel('', 110, 'left', 70);
	resPhone.color = '#2D562D';
	resPhone.font = {
		fontSize : mcd.utils.scale(20, 'h')
	};
	resDetails.add(resPhone);

	/* Button for calling restaurant */
	var callBtn = mcd.ui.createStandardButton(L('call'), 150, 40, 30, 70);
	resDetails.add(callBtn);

	/* Button for providing feedback regarding restaurant */
	var fdbkBtn = mcd.ui.createStandardButton(L('feedback'), 150, '', 30, 100);
	fdbkBtn.right = mcd.utils.scale(40, 'h');
	resDetails.add(fdbkBtn);

	/* Facilities section - show what facilities the restaurant has */
	var facDetails = Titanium.UI.createView({
		bottom : mcd.utils.scale(20, 'v'),
		height : mcd.utils.scale(160, 'v'),
		left : mcd.utils.scale(20, 'h'),
		right : mcd.utils.scale(20, 'h'),
		borderRadius : 8,
		backgroundColor : '#FAF5E2'
	});

	/* Background for header */
	var facHeaderView = Titanium.UI.createView({
		top : 0,
		height : mcd.utils.scale(30, 'v'),
		left : 0,
		right : 0,
		backgroundColor : '#e9e4d1'
	});

	/* Header label for facilities section */
	var facHeader = mcd.ui.createStandardLabel(L('facilities'), 5, 'left');
	facHeader.left = mcd.utils.scale(30, 'h');
	facHeader.color = mcd.theme.themePrimaryColor;
	facHeaderView.add(facHeader);
	facDetails.add(facHeaderView);

	var resDetailContainer = mcd.ui.constructWindow(L('res_info'), 'modal', []);

	/* Label text population */
	resAddress.text = data.addressLine;
	resCity.text = data.city + ', ' + data.state;
	resPhone.text = data.phoneNumber;

	/* 'Clean' phone number (remove hyphens, etc) */
	var cleanPhoneNumber = mcd.utils.cleanTelNumber(data.phoneNumber);

	/* Event listener for call button */
	callBtn.addEventListener('click', function(e) {
		mcd.communication.call(cleanPhoneNumber);
	});

	/* Event listener for feedback button */
	fdbkBtn.addEventListener('click', function(e) {
		// TODO
	});

	/* Icon height for all icons in facilities section */
	var iconHeight = mcd.utils.scale(30, 'h');

	if(data.restaurantFeatureData) {
		/* Icon array of facilities */
		var icons = [];
		/* Get icons based on array of facilities as returned by web service */
		for(var z = 0; z < data.restaurantFeatureData.arrayOfFeatureValues.length; z++) {
			if(data.restaurantFeatureData.arrayOfFeatureValues[z] === true) {
				icons.push(data.restaurantFeatureData.arrayOfFeatureNames[z]);
			}
		}

		/* Facilities icons */
		for(var h = 0; h < icons.length; h++) {
			var topOffset = 0;
			var leftOffset = mcd.utils.scale(10, 'h');
			/* Even numbered indices are displayed on the left */
			if(h % 2 === 0) {
				topOffset = parseInt(h / 2, 10) * iconHeight + mcd.utils.scale(45, 'v');
			}
			/* Odd numbered indices are displayed on the right */
			else {
				topOffset = parseInt(h / 2, 10) * iconHeight + mcd.utils.scale(45, 'v');
				leftOffset = mcd.utils.scale(150, 'h');
			}
			/* Icon name is same as the feature name sent by web service */
			var facIcon = Ti.UI.createLabel({
				height : iconHeight,
				width : mcd.utils.scale(120, 'h'),
				top : topOffset,
				left : leftOffset,
				backgroundImage : '/theme/' + data.restaurantFeatureData.arrayOfFeatureNames[h] + '.png'
			});
			facDetails.add(facIcon);
		}
	}

	/* Add restaurant details section & facilities details section to the main view */
	resDetailContainer.add(resDetails);
	resDetailContainer.add(facDetails);
	return resDetailContainer;
};

/**
 * @ignore
 * @description Retrieve restaurant data, populate table and map, and open window.
 * The function listens for the arrival of restaurant data from a backend service,
 * creates the necessary tables or maps, and associates them with a button bar.
 * The buttonbar (along with the list/map) is added to the view that is passed as an argument (mappingView),
 * and the view is then added to the window (winRestaurants).
 * @param {window} winRestaurants The window that is to contain the mappingView and be opened if restaurants are found.
 * @param {view} mappingView View to which map and list are to be added.
 * @param {object} currentLocation Object containing properties of current location.
 */
var createListMapView = function(winRestaurants, mappingView, currentLocation, _optType) {
	/* Function that is to be executed within event listener */
	var populaterestaurant = function(e) {
		Ti.API.info('Length of restaurant array: ' + e.data.length);
		/* Usable data array */
		var data = [];
		/* Data for table view */
		var tableData = [];
		/* Data population */
		// Data item in received data is considered unusable if it does not come with address line
		for( i = 0; i < e.data.length; i++) {
			if(e.data[i].addressLine) {
				data.push(e.data[i]);
			} else {
				/* Do not use data row if it does not come with address line */
			}
		}

		/* Data that is to be displayed in the table */
		for( i = 0; i < data.length; i++) {
			var rowData = {};
			/* Display the distance to restaurant as main label in left column */
			// use toFixed(0) to prevent Android from displaying decimals
			rowData.leftColumnMain = data[i].distance.toFixed(1);
			/* Display the distance units as sub label in left column */
			rowData.leftColumnSub = data[i].unit;
			/* Display the address of restaurant as main label in right column */
			rowData.rightColumnMain = data[i].addressLine;
			/* Display the phone number of restaurant as sub label in right column */
			rowData.rightColumnSub = data[i].phoneNumber;
			rowData.hasChild = true;
			tableData.push(rowData);
		}

		/* Only create a table if the data array is of size > 0 */
		if(tableData.length > 0) {
			/* List of returned restaurant locations */
			var table = mcd.ui.createTable(tableData, 'columns', 0.2);
			table.borderRadius = 8;
			table.addEventListener('click', function(g) {
				var resIndex = g.index;
				var resDetail = createResDetail(data[resIndex]);
				resDetail.open();
			});

			/* Region about which map is to be displayed */
			var region = {};
			/* Define region as surrounding the lat/long of the first returned location if ZIP code was provided */
			if(_optType !== 'latlong') {
				region = {
					latitude : e.data[0].latitude,
					longitude : e.data[0].longitude,
					latitudeDelta : 0.5,
					longitudeDelta : 0.5
				};
			}
			/* Define region as current latitude, longitude if user's current gps location was used */
			else {
				region = {
					latitude : currentLocation.coords.latitude,
					longitude : currentLocation.coords.longitude,
					latitudeDelta : 0.5,
					longitudeDelta : 0.5
				};
			}

			/* Map of returned restaurant locations */
			var map = mcd.services.restaurant.showRestaurantsOnMap(data, region);
			/* When an annotation is clicked, open up a modal window containing the restaurant details */
			map.addEventListener('click', function(k) {
				if(k.clicksource === 'rightButton') {
					/* annIndex is a custom property that is specified when annotation is being defined */
					var annIndex = k.annotation.annIndex;
					var annData = data[annIndex];
					var resDetail = createResDetail(annData);
					resDetail.open();
				}
			});

			/* Tabbed bar with buttons for Map and List */
			var labels = [L('map'), L('list')];
			var tabButtons = [{
				label : labels[1],
				view : table
			}, {
				label : labels[0],
				view : map
			}];
			/* Set list to be selected as default */
			var buttonBar = mcd.ui.createCustomButtonBar(tabButtons, mappingView, 0);
			winRestaurants.add(mappingView);
			winRestaurants.add(buttonBar);
			winRestaurants.open();
		} else {
			/* If no restaurants were obtained (table data length is <=0), then show alert */
			var noresAlert = mcd.ui.createAlert(L('no_restaurants_found'));
			noresAlert.show();
		}

		/* Removal of event listener to prevent multiple events from being detected */
		Ti.App.removeEventListener('got_res', populaterestaurant);
	};
	/* Once restaurant data has been retrieved, populate list and map with info */
	Ti.App.addEventListener('got_res', populaterestaurant);
};

