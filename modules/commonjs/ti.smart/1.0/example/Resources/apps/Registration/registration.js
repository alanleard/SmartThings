var mcd = require('mcd.core');
// Copyright 2012 McDonald's Corporation. All Rights Reserved.

/**
 * @fileoverview This file is the home screen of the registration sub-application.
 * The file defines the namespace/subnamespaces, includes the dependencies immediately required
 * 		and launches the screens of the sub-pplication.
 * @author Virtusa Corporation 2012.
 */

/** @ignore */
function createRegPage() {
	/**
	 @ignore
	 @namespace The subnamespace of the registration sub-application to be launched in the secure context
	 */
	mcd.app.registration = {};
	sessionId = mcd.security.getString('SessionId', '0.,?/)P7U!&@S>f');
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

