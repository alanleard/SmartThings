var mcd = require('mcd.core');
// Copyright 2012 McDonald's Corporation. All Rights Reserved.

/**
 * @fileoverview This file is the the home screen of the Quick View sub-application.
 * The file defines the namespace/subnamespaces, includes the dependencies immediately required
 * 		and launches the screens of the sub-application.
 * @author Virtusa Corporation 2012.
 */

/** @ignore */
// Function to demonstrate image caching
function CacheImageDemo() {
	var imageCaption = '';
	var imageUrl = 'http://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald\'s_Golden_Arches.svg/200px-McDonald\'s_Golden_Arches.svg.png';
	var imgView = Ti.UI.createView({
		top : 100,
		height : 200,
		width : 200
	});
	mcd.cache.getCacheableImage(imageUrl, imgView, 50000);

	// Check for whether the image came from cache or not, and change caption accordingly
	var cacheFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'mcdcache', mcd.cache.getResourceID(imageUrl));

	if(cacheFile.exists()) {
		imageCaption = 'Image is loaded from local cache';
	} else {
		imageCaption = 'Image is loaded from service request';
	}

	var imageSourceInfo = mcd.ui.createStandardLabel(imageCaption, '10%', 'center', 'auto');
	var cacheImageWindow = mcd.ui.constructWindow('Caching Image', 'singletab', [imageSourceInfo, imgView]);
	var button = Titanium.UI.createButton({
		title : 'Delete',
		top : 400,
		width : 100,
		height : 50
	});
	button.addEventListener('click', function(e) {
		mcd.cache.deleteFromCache(imageUrl);
	});
	cacheImageWindow.add(button);
	cacheImageWindow.open();
}

/** @ignore */
// Function to demonstrate service caching
function CacheServiceDemo() {
	if(Ti.Platform.osname === 'android') {
		mcd.constant.CURRENT_WINDOW = mcd.app.quickview.mainWindow;
	} else if(Ti.Platform.osname === 'iphone') {
		mcd.constant.CURRENT_WINDOW = mcd.app.quickview.mainWindow.activeTab.window;
	}

	var serviceCaption = '';
	var tableData = [];

	if(mcd.network.checkNetworkConnection()) {
		mcd.facade.sendCacheableRequest('POST', 'ResturantLocator', 'GetLocations', '', '', 'BurgerCategoryList');
	} else {
		var alt = mcd.ui.createAlert('Network Connection Not Available');
		alt.show();
	}

	// opulate table data array
	var populateTable = function(e) {
		for(var i = 0; i < e.data.length; i++) {
			var rowData = {
				label : e.data[i].addressLine
			};
			if(e.data[i].addressLine !== null && e.data[i].addressLine !== undefined) {
				tableData.push(rowData);
			}

		}
		var serviceHash = mcd.cache.getServiceHash('ResturantLocator', 'GetLocations', '');
		// Check if data is being loaded from cache and change label text accordingly
		if(mcd.cache.lookup[serviceHash]) {
			serviceCaption = 'Data is loaded from cache';
		} else {
			serviceCaption = 'Data is loaded from pay load';
		}
		var serviceSourceInfo = mcd.ui.createStandardLabel(serviceCaption, 20, 'center', 'auto');
		var table = mcd.ui.createTable(tableData, 'plain', '');
		table.top = mcd.utils.scale(60);
		table.width = mcd.platform.size.width * 9 / 10;
		table.borderRadius = 5;
		table.backgroundColor = 'transparent';

		var cacheServiceWindow = mcd.ui.constructWindow('Caching Service', 'singletab', [serviceSourceInfo, table]);
		cacheServiceWindow.open();
		// Remove event listener for better performance
		Ti.App.removeEventListener('BurgerCategoryList', populateTable);
	};
	// Populate table once data has been obtained
	Ti.App.addEventListener('BurgerCategoryList', populateTable);
}

/** @ignore */
// Function to demonstrate openID login
function logInDemo() {
	var sessionId = mcd.security.getString('SessionId', '0.,?/)P7U!&@S>f');
	Ti.API.info('logInDemo: ' + sessionId);
	// If session ID exists, it implies user has already logged in

	if(sessionId !== null && sessionId !== undefined) {
		Ti.API.info('Log in demo, sessionID not null');
		mcd.notify('homescreen', 'Welcome Registered User');
		var userAlert = mcd.ui.createAlert('User has logged in.');
		userAlert.show();
		// If session ID is null, take user to openID login page
	} else {
		Ti.API.info('Log in demo, sessionID null');
		if(mcd.network.checkNetworkConnection()) {
			mcd.openId.openIdWebView();
		} else {
			var alt = mcd.ui.createAlert('Network Connection Not Available');
			alt.show();
		}
	}

	function updateSessionId() {
		sessionId = mcd.security.getString('SessionId', '0.,?/)P7U!&@S>f');
		mcd.notify('homescreen', 'Welcome Registered User');
		Ti.App.removeEventListener('grantEntrance', updateSessionId);
	}


	Ti.App.addEventListener('grantEntrance', updateSessionId);
}

/** @ignore */
// Function to demonstrate openID logout
function logOutDemo() {
	// Get session ID (pass encryption key)
	sessionId = mcd.security.getString('SessionId', '0.,?/)P7U!&@S>f');
	Ti.API.info('logoutDemo: ' + sessionId);
	// If session ID exists, then log the user out
	if(sessionId !== null && sessionId !== undefined) {
		Ti.API.info('Log out demo, sessionID not null');
		// Homescreen message should reflect the logged-out state
		mcd.notify('homescreen', L('welcome'));
		// Nullify the session ID
		mcd.security.setString('SessionId', null, '0.,?/)P7U!&@S>f');
		var logOutAlert = mcd.ui.createAlert('Successfully logged out.');
		logOutAlert.show();
		// If session ID is null, it implies no-one has logged in yet
	} else {
		Ti.API.info('Log out demo, sessionID null');
		var noUserAlert = mcd.ui.createAlert('No user has logged in yet.');
		noUserAlert.show();
	}
}
