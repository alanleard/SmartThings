var mcd = require('mcd.core');
// Copyright 2012 McDonald's Corporation. All Rights Reserved.

/**
 * @fileoverview This file creates a configurable menu for sub-applications,
 * or for the home screen in general.
 * Each menu item redirects to the 'homescreen' of the corresponding sub-application.
 * @author Virtusa Corporation 2012.
 */

/* Specify the files to include for each application */
// Restaurant locator-related files
Ti.include('apps/RestaurantLocator/restaurantLocator.js');
Ti.include('apps/RestaurantLocator/restaurantLocatorSub.js');
//Ti.include('lib/business/services/diRestaurant.js');
//Ti.include('lib/business/services/servicesRestaurant.js');

// Nutrition App-related files
Ti.include('apps/NutritionInfo/nutritionInfo.js');
Ti.include('apps/NutritionInfo/nutritionInfoSubWindows.js');
//Ti.include('lib/business/services/diNutrition.js');
//Ti.include('lib/business/services/servicesNutrition.js');

// E-Form application related files
Ti.include('apps/eForm/eForm.js');

// Web Survey related files
Ti.include('apps/WebSurvey/webSurvey.js');

// Web Survey related files
Ti.include('apps/Registration/registration.js');

//Quickview related files
Ti.include('apps/QuickView/quickView.js');
Ti.include('apps/QuickView/cacheImageDemo.js');

//Test App
Ti.include('testApp/utils/testMain.js');

(function() {
	// Create home screen
	mcd.home = mcd.ui.constructWindow('Home', 'single', []);

	/* Create standard grid layout */
	// Application array
	var gridItems = [[{
		image : '/theme/restLocatorTop.png',
		app : 'createResLocator',
		label : L('restaurant_locator'),
		colSpan : 2
	}, {}, {
		image : '/theme/games.png',
		app : 'createQuickViewApp',
		label : L('quick_demo')
	}], [{
		image : '/theme/restLocatorBottom.png',
		app : 'createResLocator',
		colSpan : 2
	}, {}, {
		image : '/theme/feedback.png',
		app : 'createEform',
		label : L('feedback')
	}], [{
		image : '/theme/promos.png',
		app : 'createWebSurvey',
		label : L('audit')
	}, {
		image : '/theme/nutritionTop.png',
		app : 'createNutriApp',
		label : L('nutrition'),
		colSpan : 2
	}, {}], [{
		image : '/theme/settings.png',
		app : 'createTestApp',
		label : L('test')
	}, {
		image : '/theme/nutritionBottom.png',
		app : 'createNutriApp',
		colSpan : 2
	}, {}]];

	var params = {
		rows : 4,
		columns : 3
	};
	var homeScreen = mcd.ui.createHomeScreen('grid', params, gridItems);
	mcd.home.add(homeScreen);

	// Add welcome message on home screen
	mcd.log.notify('homescreen', L('welcome'));
	// Add transition effect if platform is iPhone
	if(mcd.platform.name === 'iphone') {
		mcd.home.open({
			transition : Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
		});
	} else {
		mcd.home.open();
	}
})(); 