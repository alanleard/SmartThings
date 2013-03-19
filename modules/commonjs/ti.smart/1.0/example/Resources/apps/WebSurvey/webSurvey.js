var mcd = require('mcd.core');
// Copyright 2012 McDonald's Corporation. All Rights Reserved.

/**
 * @fileoverview This file is the the home screen of the WebSurvey sub-application.
 * The file defines the namespace/subnamespaces, includes the dependencies immediately required
 * 		and launches the screens of the sub-pplication.
 * @author Virtusa Corporation 2012.
 */

/** @ignore */
function createWebSurvey() {
	/**
	 @ignore
	 @namespace The subnamespace of the WebSurvey sub-application to be launched in the secure context
	 */
	mcd.app.WebSurvey = {};

	var isBackButtonAdded = false;
	var timer = null;

	//Inititate main window
	mcd.app.WebSurvey.main = mcd.ui.constructWindow('', 'single', []);
	if(mcd.network.checkNetworkConnection()) {
		var myBrowser = mcd.ui.launchBrowser('https://gdct2.mcd.com', mcd.app.WebSurvey.main, false);
	} else {
		var alt = mcd.ui.createAlert('Network Connection Not Available');
		alt.show();
	}

}