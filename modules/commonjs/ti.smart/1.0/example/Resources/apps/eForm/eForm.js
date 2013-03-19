var mcd = require('mcd.core');
// Copyright 2012 McDonald's Corporation. All Rights Reserved.

/**
 * @fileoverview This file is the the home screen of the e-Form sub-application.
 * The file defines the namespace/subnamespaces, includes the dependencies immediately required
 * 		and launches the screens of the sub-application.
 * @author Virtusa Corporation 2012.
 */

/** @ignore */
function createEform() {
	/**
	 * @ignore
	 * @namespace The subnamespace of the e-Form sub-application.
	 */

	mcd.app.eForm = {};

	//Inititate main window

	mcd.app.eForm.main = mcd.ui.constructWindow('', 'single', []);
	if(mcd.network.checkNetworkConnection()) {
		var myBrowser = mcd.ui.launchBrowser(mcd.config.feedBackUrl, mcd.app.eForm.main);
	} else {
		var alt = mcd.ui.createAlert('Network Connection Not Available.');
		alt.show();
	}
}