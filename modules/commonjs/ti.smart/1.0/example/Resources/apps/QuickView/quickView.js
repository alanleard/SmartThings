var mcd = require('mcd.core');
// Copyright 2012 McDonald's Corporation. All Rights Reserved.

/**
 * @fileoverview This file is the the home screen of the Quick View sub-application.
 * The file defines the namespace/subnamespaces, includes the dependencies immediately required
 * 		and launches the screens of the sub-application.
 * @author Virtusa Corporation 2012.
 */

/** @ignore */
function createQuickViewApp() {
	/**
	 *@ignore
	 *@namespace The subnamespace of the quickview sub-application
	 */
	mcd.app.quickview = {};
	mcd.app.quickview.isCacheService = false;

	// Function to call the log-in demo
	mcd.app.quickview.launchLogInDemo = function() {
		logInDemo();
	};

	// Function to call the log-out demo
	mcd.app.quickview.launchLogoutDemo = function() {
		logOutDemo();
	};

	// Function to call the image cache demo
	mcd.app.quickview.launchImageCacheDemo = function() {
		CacheImageDemo();
	};

	// Function to call the service cache demo
	mcd.app.quickview.launchServiceCacheDemo = function(e) {
		CacheServiceDemo();
	};

	// Create view area to hold grid
	var gridView = Ti.UI.createView();
	if(mcd.platform.name === 'iphone' || mcd.platform.name === 'ipad') {
		gridView.top = 40;
	}

	// Get the height and width of the view, to pass as parameters to the createLayout function
	var gridHeight = gridView.getHeight();
	var gridWidth = gridView.getWidth();

	// Specify the images and function names
	var gridItems = [[{
		image : '/theme/demo_login.png',
		app : 'mcd.app.quickview.launchLogInDemo',
		label : 'Login'
	}, {
		image : '/theme/demo_logout.png',
		app : 'mcd.app.quickview.launchLogoutDemo',
		label : 'Logout'
	}], [{
		image : '/theme/demo_image.png',
		app : 'mcd.app.quickview.launchImageCacheDemo',
		label : 'Image Cache'
	}, {
		image : '/theme/demo_service.png',
		app : 'mcd.app.quickview.launchServiceCacheDemo',
		label : 'Service Cache'
	}]];
	// Define the row/column parameters
	var params = {
		rows : 2,
		columns : 2,
		height : gridHeight,
		width : gridWidth
	};
	// Create grid layout using the specified images/parameters
	var demoGrid = mcd.ui.createLayout('grid', params, gridItems);
	// Construct the main window for this sub-application
	mcd.app.quickview.mainWindow = mcd.ui.constructWindow('Quick View', 'singletab', []);
	// Add the grid view to the window
	mcd.app.quickview.mainWindow.add(gridView);
	// Add the grid layout to the grid view
	demoGrid.top = 0;
	gridView.add(demoGrid);

	// Add an event listener to the grid which executes the relevant function
	demoGrid.addEventListener('click', function(e) {
		Ti.API.info('Source App: ' + e.source.app);
		if(e.source.app) {
			// Create function from string
			var fn = new Function('term', 'return ' + e.source.app + '(term);');
			fn();
		}
	});
	// Open the window of the quick view sub-app
	mcd.app.quickview.mainWindow.open();
}

