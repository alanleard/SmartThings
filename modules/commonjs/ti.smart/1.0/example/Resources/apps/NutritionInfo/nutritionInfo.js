var mcd = require('mcd.core');
// Copyright 2012 McDonald's Corporation. All Rights Reserved.

/**
 * @fileoverview This file is the bootstrap file and the home screen of the nutrition info sub-application.
 * The file defines the namespace/subnamespaces, includes the dependencies immediately required .
 * 		and launches the screens of the sub-application.
 * @author Virtusa Corporation 2012.
 */

/** @ignore */
/* Create a function which is an extension of the existing functions */
var createNutriLabel = function(title, top, align, left) {
	/* Use APIs from Ref.Framework and then customize */
	var label = mcd.ui.createStandardLabel(title, top, align, left);
	label.font = {
		fontSize : mcd.utils.scale(16, 'h')
	};
	label.color = '#222222';
	return label;
};

/**
 * @ignore
 * @description Create main nutrition app window. The window will contain
 * a table view (or list) with the main menu categories.
 * On clicking any one of the categories, the user will be taken to a sub-menu
 * containing the items within that category.
 * The window also displays the total calorie count of the user's meal,
 * and also the total number of items in the user's meal.
 * On clicking the meal bag icon, the user is shown the items in his meal, in the form of a menu.
 */
function createNutriApp() {
	/**
	 @ignore
	 @namespace The subnamespace of the nutrition information sub-application
	 */
	mcd.app.nutrition = {};

	/* Get the menu from backend (or DI) */
	mcd.services.nutrition.getMenu('MenuInformation', 'GetBurgerCategoryList', 'get_menu');

	// Tab separations of the tabbed nutrition application
	var tabTitles = [{
		name : L('menu_builder'),
		icon : '/theme/mealbuilder_icon.png'
	}, {
		name : L('nutrimeter'),
		icon : '/theme/nutrimeter_icon.png'
	}];

	/* Menu Builder */
	// Object containing user's meal details
	mcd.app.nutrition.totalMealObj = {};
	// Total calories in user's meal
	mcd.app.nutrition.totalMealObj.totalCalories = 0;
	// Total protein in user's meal
	mcd.app.nutrition.totalMealObj.totalProtein = 0;
	// Total fat in user's meal
	mcd.app.nutrition.totalMealObj.totalFat = 0;
	// Total carbs in user's meal
	mcd.app.nutrition.totalMealObj.totalCarbs = 0;
	// Total sodium in user's meal
	mcd.app.nutrition.totalMealObj.totalSodium = 0;
	// Total number of items in user's meal
	mcd.app.nutrition.totalMealObj.totalNumberOfItems = 0;
	// Array containing items in user's meal
	mcd.app.nutrition.totalMealObj.items = [];

	// Create image as background for calorie count
	var calorieCountImage = Ti.UI.createView({
		top : mcd.utils.scale(10, 'v'),
		left : mcd.utils.scale(20, 'h'),
		height : mcd.utils.scale(120, 'v'),
		width : mcd.utils.scale(150, 'h'),
		backgroundImage : '/theme/salad.png'
	});

	// Display calories on label
	var calorieCountLabel = mcd.ui.createLargeLabel('', 20, 'center');
	calorieCountLabel.font = {
		fontSize : mcd.utils.scale(30, 'h'),
		fontWeight : 'bold'
	};
	calorieCountLabel.text = mcd.app.nutrition.totalMealObj.totalCalories.toFixed(0);
	// Label containing static localized text for 'calories'
	var calorieLabel = mcd.ui.createLargeLabel('', 50, 'center');
	calorieLabel.text = L('cal');
	calorieLabel.font = {
		fontSize : mcd.utils.scale(24, 'h'),
		fontWeight : 'bold'
	};

	calorieCountImage.add(calorieCountLabel);
	calorieCountImage.add(calorieLabel);

	// Create image as background for item count
	var itemCountImage = Ti.UI.createView({
		top : 0,
		right : mcd.utils.scale(20, 'h'),
		height : mcd.utils.scale(100, 'v'),
		width : mcd.utils.scale(100, 'h'),
		backgroundImage : '/theme/noBag.png'
	});

	// Display item count on label
	var itemCountLabel = mcd.ui.createLargeLabel('', 25, 'center');
	itemCountLabel.text = mcd.app.nutrition.totalMealObj.totalNumberOfItems.toFixed(0);
	// Label containing static localized text for 'items'
	var itemStaticLabel = mcd.ui.createStandardLabel(L('items'), 50, 'center');
	itemStaticLabel.color = '#8c1717';

	itemCountImage.add(itemCountLabel);
	itemCountImage.add(itemStaticLabel);

	// Array of UIObjects required for mealbuilder  tab
	var mealBuilderUIObjects = [calorieCountImage, itemCountImage];

	/* NutriMeter */
	// Instantiate nutrimeter
	var nutriMeter = mcd.ui.createImageView('nutrimeter', '/theme/nutrimeterBg.png', 10, 10, 135, 300);
	// Label containing minimum calorie value
	var meterScaleMin = Ti.UI.createLabel({
		text : mcd.config.nutriMeter.minimum,
		color : '#ffffff',
		top : mcd.utils.scale(90, 'v'),
		left : mcd.utils.scale(40, 'h')
	});
	// Middle value of calorie requirement for user
	var scaleMid = (mcd.config.nutriMeter.minimum + mcd.config.nutriMeter.maximum) / 2;
	// Label containing middle calorie value
	var meterScaleMid = Ti.UI.createLabel({
		text : scaleMid,
		color : '#ffffff',
		top : (mcd.platform.name === 'iphone') ? 40 : mcd.utils.scale(49, 'v'),
		left : (mcd.platform.name === 'iphone') ? 135 : mcd.utils.scale(146, 'h')

	});
	// Label containing maximum calorie value
	var meterScaleMax = Ti.UI.createLabel({
		text : mcd.config.nutriMeter.maximum,
		color : '#ffffff',
		top : (mcd.platform.name === 'iphone') ? 120 : mcd.utils.scale(129, 'v'),
		left : (mcd.platform.name === 'iphone') ? 200 : mcd.utils.scale(226, 'h')

	});

	if(mcd.platform.name === 'iphone' || mcd.platform.name === 'ipad') {
		nutriMeter.add(meterScaleMid);
		nutriMeter.add(meterScaleMax);
	}

	/* Order Summary section */
	// Section below nutrimeter showing summary of meal
	var container = Ti.UI.createView({
		left : mcd.utils.scale(25, 'h'),
		right : mcd.utils.scale(25, 'h'),
		top : mcd.utils.scale(160, 'v'),
		borderRadius : 8,
		borderColor : '#5a7d12',
		backgroundImage : mcd.theme.tableBackground
	});
	container.bottom = (mcd.platform.name === 'iphone') ? mcd.utils.scale(60, 'v') : mcd.utils.scale(100, 'v');
	// Heading background for Order Summary section
	var headerView = Ti.UI.createView({
		top : 0,
		backgroundColor : '#5a7d12',
		height : mcd.utils.scale(30, 'v')
	});
	// Heading for Order Summary section
	var heading = mcd.ui.createLargeLabel(L('order_sum'), 5, 'left');
	heading.left = mcd.utils.scale(20, 'h');
	heading.color = '#ffffff';
	heading.font = {
		fontSize : mcd.utils.scale(16, 'h')
	};
	headerView.add(heading);

	/* Variables */
	// Temporary variable for total number of items
	var itemsTemp = mcd.app.nutrition.totalMealObj.totalNumberOfItems.toFixed(0);
	// Temporary variable for total calories
	var calTemp = mcd.app.nutrition.totalMealObj.totalCalories.toFixed(0);
	// Temporary variable for total carbohydrates
	var carbTemp = mcd.app.nutrition.totalMealObj.totalCarbs.toFixed(0) + 'g';
	// Temporary variable for total protein
	var proTemp = mcd.app.nutrition.totalMealObj.totalProtein.toFixed(0) + 'g';

	/* Labels in Order Summary section */
	// Label text for total number of items
	var totItemLabel = createNutriLabel(L('tot_items'), 40, 'left', 20);
	// Label with value of total number of items
	var totItemsValue = createNutriLabel(itemsTemp, 40, 'left', 210);
	// Label text for total calories
	var totCalLabel = createNutriLabel(L('cal'), 65, 'left', 20);
	// Label with value of total calories
	var totCalValue = createNutriLabel(calTemp, 65, 'left', 210);
	// Label text for total carbs
	var totCarbLabel = createNutriLabel(L('carb'), 90, 'left', 20);
	// Label with value of total carbs
	var totCarbValue = createNutriLabel(carbTemp, 90, 'left', 210);
	// Label text for total protein
	var totProLabel = createNutriLabel(L('protein'), 115, 'left', 20);
	// Label with value of total protein
	var totProValue = createNutriLabel(proTemp, 115, 'left', 210);

	container.add(headerView);
	container.add(totItemLabel);
	container.add(totItemsValue);
	container.add(totCalLabel);
	container.add(totCalValue);
	container.add(totCarbLabel);
	container.add(totCarbValue);
	container.add(totProLabel);
	container.add(totProValue);

	// Customize/Personalize button
	var userDetailButton = mcd.ui.createStandardButton(L('customize'), 320, 30, 30, 260);

	// Array of UIObjects required for nutrition tab
	var nutritionUIObjects = [nutriMeter, userDetailButton, container];

	/* Personalization Window */
	// Create background for personalization window
	var modalContainer = Ti.UI.createView({
		top : mcd.utils.scale(20, 'v'),
		bottom : mcd.utils.scale(20, 'v'),
		left : mcd.utils.scale(20, 'h'),
		right : mcd.utils.scale(20, 'h'),
		borderRadius : 8,
		backgroundColor : 'FFFCCF',
		backgroundImage : mcd.theme.tableBackground,
		borderColor : '532c03'
	});

	// Create heading for personalization window
	var modalHeading = mcd.ui.createLargeLabel(L('enter_cust'), 30, 'left');
	modalHeading.left = mcd.utils.scale(40, 'h');
	modalHeading.right = mcd.utils.scale(40, 'h');
	modalHeading.color = '#6B8E23';
	modalHeading.font = {
		fontSize : mcd.utils.scale(16, 'h')
	};

	// Horizontal view to contain height info
	var heightContainer = Ti.UI.createView({
		borderRadius : 5,
		borderColor : '#AC6F3E',
		backgroundColor : '#F2E6DB',
		left : mcd.utils.scale(40, 'h'),
		right : mcd.utils.scale(40, 'h'),
		height : mcd.utils.scale(50, 'v'),
		top : mcd.utils.scale(90, 'v')
	});
	// Height icon
	var heightIcon = Ti.UI.createView({
		left : mcd.utils.scale(10, 'h'),
		width : mcd.utils.scale(40, 'h'),
		height : mcd.utils.scale(40, 'v'),
		top : mcd.utils.scale(5, 'v'),
		backgroundImage : '/theme/ruler.png'
	});
	var height_ppl = L('height');
	// Height label
	var heightLabel = mcd.ui.createStandardLabel(height_ppl, 5, 'center');
	heightLabel.left = mcd.utils.scale(65, 'h');
	heightLabel.width = mcd.utils.scale(60, 'h');
	heightLabel.color = '#AC6F3E';
	heightLabel.font = {
		fontSize : mcd.utils.scale(16, 'h')
	};
	// Default height value
	var heightVal = 70;
	// Height input textbox
	var heightPeople = mcd.ui.createStandardTextBox('', 6, 150, 35, 80);
	heightPeople.value = heightVal.toFixed(0);
	heightPeople.textAlign = Titanium.UI.TEXT_ALIGNMENT_CENTER;
	heightPeople.font = {
		fontSize : mcd.utils.scale(16, 'h')
	};
	heightPeople.keyboardType = Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION;
	// Do not allow user input to be anything other than numbers
	mcd.utils.forceNumeric(heightPeople);
	// Do not allow for more than 2 digits to be entered
	mcd.utils.limitInput(heightPeople, 2);

	heightContainer.add(heightIcon);
	heightContainer.add(heightLabel);
	heightContainer.add(heightPeople);

	// Horizontal view to contain weight info
	var weightContainer = Ti.UI.createView({
		borderRadius : 5,
		borderColor : '#AC6F3E',
		backgroundColor : '#F2E6DB',
		left : mcd.utils.scale(40, 'h'),
		right : mcd.utils.scale(40, 'h'),
		height : mcd.utils.scale(50, 'v'),
		top : mcd.utils.scale(150, 'v')
	});
	// Weight icon
	var weightIcon = Ti.UI.createView({
		left : mcd.utils.scale(10, 'h'),
		width : mcd.utils.scale(40, 'h'),
		height : mcd.utils.scale(40, 'v'),
		top : mcd.utils.scale(5, 'v'),
		backgroundImage : '/theme/scale.png'
	});
	var weight_ppl = L('weight');
	// Weight label
	var weightLabel = mcd.ui.createStandardLabel(weight_ppl, 5, 'center');
	weightLabel.left = mcd.utils.scale(65, 'h');
	weightLabel.width = mcd.utils.scale(60, 'h');
	weightLabel.color = '#AC6F3E';
	weightLabel.font = {
		fontSize : mcd.utils.scale(16, 'h')
	};
	// Weight input textbox
	var weightPeople = mcd.ui.createStandardTextBox('', 6, 150, 35, 80);
	// Default weight value
	var weightVal = 150;
	weightPeople.value = weightVal.toFixed(0);
	weightPeople.textAlign = Titanium.UI.TEXT_ALIGNMENT_CENTER;
	weightPeople.font = {
		fontSize : mcd.utils.scale(16, 'h')
	};
	weightPeople.keyboardType = Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION;
	// Do not allow user input to be anything other than numbers
	mcd.utils.forceNumeric(weightPeople);
	// Do not allow for more than 3 digits to be entered
	mcd.utils.limitInput(weightPeople, 3);

	weightContainer.add(weightIcon);
	weightContainer.add(weightLabel);
	weightContainer.add(weightPeople);

	// Horizontal view to contain age info
	var ageContainer = Ti.UI.createView({
		borderRadius : 5,
		borderColor : '#AC6F3E',
		backgroundColor : '#F2E6DB',
		left : mcd.utils.scale(40, 'h'),
		right : mcd.utils.scale(40, 'h'),
		height : mcd.utils.scale(50, 'v'),
		bottom : (mcd.platform.name === 'iphone') ? 156 : 290
	});
	// Age icon
	var ageIcon = Ti.UI.createView({
		left : mcd.utils.scale(10, 'h'),
		width : mcd.utils.scale(40, 'h'),
		height : mcd.utils.scale(40, 'v'),
		top : mcd.utils.scale(5, 'v'),
		backgroundImage : '/theme/cake.png'
	});
	var age_ppl = L('age');
	// Age label
	var ageLabel = mcd.ui.createStandardLabel(age_ppl, 5, 'center');
	ageLabel.left = mcd.utils.scale(65, 'h');
	ageLabel.width = mcd.utils.scale(60, 'h');
	ageLabel.color = '#AC6F3E';
	ageLabel.font = {
		fontSize : mcd.utils.scale(16, 'h')
	};

	// Default age value
	var ageVal = 21;
	// Age input textbox
	var agePeople = mcd.ui.createStandardTextBox('', 6, 150, 35, 80);
	agePeople.value = ageVal.toFixed(0);
	agePeople.textAlign = Titanium.UI.TEXT_ALIGNMENT_CENTER;
	agePeople.font = {
		fontSize : mcd.utils.scale(16, 'h')
	};
	agePeople.keyboardType = Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION;
	// Do not allow user input to be anything other than numbers
	mcd.utils.forceNumeric(agePeople);
	// Do not allow for more than 3 digits to be entered
	mcd.utils.limitInput(agePeople, 3);

	// handle keyboard for iphone
	if(mcd.platform.name === 'iphone') {
		mcd.ui.handleKeypadInput(agePeople, ageContainer, 217, 156);
	}

	ageContainer.add(ageIcon);
	ageContainer.add(ageLabel);
	ageContainer.add(agePeople);

	// Horizontal view to contain gender info
	var genContainer = Ti.UI.createView({
		borderRadius : 5,
		borderColor : '#AC6F3E',
		backgroundColor : '#F2E6DB',
		left : mcd.utils.scale(40, 'h'),
		right : mcd.utils.scale(40, 'h'),
		height : mcd.utils.scale(50, 'v'),
		top : mcd.utils.scale(270, 'v')
	});
	// Gender icon
	var genIcon = Ti.UI.createView({
		left : mcd.utils.scale(10, 'h'),
		width : mcd.utils.scale(40, 'h'),
		height : mcd.utils.scale(40, 'v'),
		top : mcd.utils.scale(5, 'v'),
		backgroundImage : '/theme/gender.png'
	});

	var gen_ppl = L('gender');
	// Gender label
	var genLabel = mcd.ui.createStandardLabel(gen_ppl, 12, 'center');
	genLabel.left = mcd.utils.scale(65, 'h');
	genLabel.width = mcd.utils.scale(60, 'h');
	genLabel.color = '#AC6F3E';
	genLabel.font = {
		fontSize : mcd.utils.scale(16, 'h')
	};
	var genVal = 'M';
	var genMLabel = mcd.ui.createStandardLabel('M', 12, 'left');
	genMLabel.left = mcd.utils.scale(135, 'h');
	genMLabel.width = mcd.utils.scale(60, 'h');
	genMLabel.color = '#532c03';
	genMLabel.font = {
		fontSize : mcd.utils.scale(16, 'h')
	};
	// Pseudo radio button to denote gender = 'M'
	// Default selected
	var genMale = Ti.UI.createButton({
		top : mcd.utils.scale(8, 'v'),
		left : mcd.utils.scale(150, 'h'),
		height : mcd.utils.scale(30, 'v'),
		width : mcd.utils.scale(30, 'h'),
		selected : true,
		backgroundImage : '/theme/radio_btn_selected.png'
	});
	var genFLabel = mcd.ui.createStandardLabel('F', 12, 'left');
	genFLabel.left = mcd.utils.scale(185, 'h');
	genFLabel.width = mcd.utils.scale(60, 'h');
	genFLabel.color = '#532c03';
	genFLabel.font = {
		fontSize : mcd.utils.scale(16, 'h')
	};
	// Pseudo radio button to denote gender = 'F'
	// Default unselected
	var genFemale = Ti.UI.createButton({
		top : mcd.utils.scale(8, 'v'),
		left : mcd.utils.scale(200, 'h'),
		height : mcd.utils.scale(30, 'v'),
		width : mcd.utils.scale(30, 'h'),
		selected : false,
		backgroundImage : '/theme/radio_btn.png'
	});

	genContainer.add(genIcon);
	genContainer.add(genLabel);
	genContainer.add(genMLabel);
	genContainer.add(genMale);
	genContainer.add(genFLabel);
	genContainer.add(genFemale);

	// Add event listener which swaps selected status of the 'M' and 'F' radio buttons
	genMale.addEventListener('click', function() {
		// If it's already selected
		if(genMale.selected === true) {
			// Do nothing
		}
		// If currently unselected, then make it selected
		else {
			genMale.selected = true;
			genMale.backgroundImage = '/theme/radio_btn_selected.png';
			genFemale.selected = false;
			genFemale.backgroundImage = '/theme/radio_btn.png';
			genVal = 'm';
		}
	});

	// Add event listener which swaps selected status of the 'M' and 'F' radio buttons
	genFemale.addEventListener('click', function() {
		// If it's already selected
		if(genFemale.selected === true) {
			// Do nothing
		}
		// If currently unselected, then make it selected
		else {
			genFemale.selected = true;
			genFemale.backgroundImage = '/theme/radio_btn_selected.png';
			genMale.selected = false;
			genMale.backgroundImage = '/theme/radio_btn.png';
			genVal = 'f';
		}
	});

	// Construct the modal Personalize Window
	var userDetails = mcd.ui.constructWindow(L('customize'), 'modal', []);
	userDetails.backgroundImage = '/theme/imgNutrimeterBackground.png';
	userDetails.leftNavButton = null;
	// Save button to save user preferences
	var saveDetailButton = mcd.ui.createStandardButton(L('save_close'), 340, 40, 30, 240);

	// Add all the UI elements to the window
	userDetails.add(modalContainer);
	userDetails.add(modalHeading);
	userDetails.add(heightContainer);
	userDetails.add(weightContainer);
	userDetails.add(ageContainer);
	userDetails.add(genContainer);
	userDetails.add(saveDetailButton);

	// Array of arrays with UI objects
	var tabUIObjects = [mealBuilderUIObjects, nutritionUIObjects];

	// Construct multi tab window
	mcd.app.nutrition.main = mcd.ui.constructWindow(tabTitles, 'multitab', tabUIObjects);

	var mealDetailContainer = mcd.ui.constructWindow(L('your_meal'), 'modal', []);

	var totalMenu = createTotalMenu();
	itemCountImage.addEventListener('click', function() {
		totalMenu = createTotalMenu();
		mealDetailContainer.add(totalMenu);
		mealDetailContainer.open();
	});
	itemCountImage.addEventListener('blur', function() {
		mealDetailContainer.remove(totalMenu);
		mealDetailContainer.close();
	});
	mealDetailContainer.addEventListener('close', function() {
		mealDetailContainer.remove(totalMenu);
	});

	/* Menu Builder Data Population */
	var nutridata = {};

	/** @ignore
	 * @description Function to be executed when menu details are obtained (from backend or DI).
	 * The returned object is used to populate data for the rows of a table.
	 * The table contains only the main menu categories. The category name and
	 * an image are displayed on each row.
	 * On clicking any one of the main categories, a sub-menu with the items
	 * within the category is displayed in a new window.
	 */
	var populateMenu = function(e) {
		mainMenuData = e.data;
		var tabledata = [];
		for(var i = 0; i < mainMenuData.length; i++) {
			var rowData = {};
			rowData.label = mainMenuData[i].Key;
			rowData.image = mainMenuData[i].item[0].images.small_image;
			if(mainMenuData.item) {
				rowData.hasChild = true;
			}
			tabledata.push(rowData);
		}

		/* Table containing main menu categories */
		var mainMenuTable = mcd.ui.createTable(tabledata, 'imageLabel');
		mainMenuTable.top = mcd.utils.scale(120, 'v');
		mainMenuTable.width = mcd.platform.size.width * 9 / 10;
		mainMenuTable.borderRadius = 8;
		mainMenuTable.backgroundColor = 'transparent';
		mainMenuTable.addEventListener('click', function(e) {
			var rowIndex = e.index;
			var subMenuData = mainMenuData[rowIndex].item;
			var subMenuWindow = createSubWindow(mainMenuData[rowIndex].Key, subMenuData);
			mcd.app.nutrition.main.tabs[0].open(subMenuWindow);
		});
		mcd.app.nutrition.main.windows[0].add(mainMenuTable);
		Ti.App.removeEventListener('get_menu', populateMenu);
	};
	Ti.App.addEventListener('get_menu', populateMenu);

	/* Force calorie count and item count labels to update values
	 * every time the window gains focus */
	mcd.app.nutrition.main.windows[0].addEventListener('focus', function() {
		calorieCountLabel.text = mcd.app.nutrition.totalMealObj.totalCalories.toFixed(0);
		itemCountLabel.text = mcd.app.nutrition.totalMealObj.totalNumberOfItems.toFixed(0);
	});

	/* NutriMeter Dynamic */

	// Instantiate pointer
	var pointer = mcd.services.createAnimPointer();
	mcd.app.nutrition.main.windows[1].addEventListener('focus', function(e) {
		pointer = mcd.services.createAnimPointer();
		mcd.app.nutrition.main.windows[1].add(pointer);
	});
	mcd.app.nutrition.main.windows[1].addEventListener('blur', function(e) {
		mcd.app.nutrition.main.windows[1].remove(pointer);
	});

	userDetailButton.addEventListener('click', function() {
		// Open with default values
		userDetails.open();
	});
	// When save button is clicked, calculate calorie requirement and update nutrimeter
	saveDetailButton.addEventListener('click', function() {
		var tempAge = parseInt(agePeople.value, 10);
		var tempWeight = parseInt(weightPeople.value, 10);
		var tempHeight = parseInt(heightPeople.value, 10);
		// If valid values have been given (positive integers)
		if(tempAge > 0 && tempWeight > 0 && tempHeight > 0) {
			weightVal = tempWeight;
			heightVal = tempHeight;
			ageVal = tempAge;
			// Remove pointer from nutrimeter, since it now points to incorrect value
			mcd.app.nutrition.main.windows[1].remove(pointer);
			// Calculate calorie requirement based on user input
			var userCalMax = mcd.services.calorieCalculator(weightVal, heightVal, ageVal, genVal);
			// Re-assign max, middle calorie values
			mcd.config.nutriMeter.maximum = userCalMax;
			meterScaleMax.text = userCalMax;
			scaleMid = (mcd.config.nutriMeter.minimum + mcd.config.nutriMeter.maximum) / 2;
			var midDisplay = scaleMid.toFixed(0);
			mcd.config.isNutriInfo = true;
			meterScaleMid.text = midDisplay;
			// Close the window
			userDetails.close();

			// the pointer gets removed with the 'close' event, the pointer is added again
			if(mcd.platform.name === 'android') {

				meterScaleMax.text = mcd.config.nutriMeter.maximum;
				mcd.app.nutrition.main.windows[1].add(meterScaleMax);

				meterScaleMid.text = midDisplay;
				mcd.app.nutrition.main.windows[1].add(meterScaleMid);

				setTimeout(function() {
					pointer = mcd.services.createAnimPointer();
					mcd.app.nutrition.main.windows[1].add(pointer);
				}, 500);

			}
		}

		// If invalid values have been entered, inform user via alert
		else {
			var invalidAlert = mcd.ui.createAlert(L('field_invalid'));
			invalidAlert.show();
		}
	});

	// Whenever calorie values get updated, update the relevant labels
	Ti.App.addEventListener('calorie_update', function() {
		calorieCountLabel.text = mcd.app.nutrition.totalMealObj.totalCalories.toFixed(0);
		itemCountLabel.text = mcd.app.nutrition.totalMealObj.totalNumberOfItems.toFixed(0);
		itemsTemp = mcd.app.nutrition.totalMealObj.totalNumberOfItems.toFixed(0);
		calTemp = mcd.app.nutrition.totalMealObj.totalCalories.toFixed(0);
		carbTemp = mcd.app.nutrition.totalMealObj.totalCarbs.toFixed(0) + 'g';
		proTemp = mcd.app.nutrition.totalMealObj.totalProtein.toFixed(0) + 'g';
		totItemsValue.text = itemsTemp;
		totCalValue.text = calTemp;
		totCarbValue.text = carbTemp;
		totProValue.text = proTemp;
	});

	if(mcd.platform.name === 'iphone' || mcd.platform.name === 'ipad') {
		// Change title of back buttom to improve usability
		mcd.app.nutrition.main.windows[1].leftNavButton.title = L('home');
	}

	// Accessing app-specific theme files
	mcd.app.nutrition.main.windows[0].backgroundImage = '/theme/imgMealBuilderBackground.png';
	mcd.app.nutrition.main.windows[1].backgroundImage = '/theme/imgNutrimeterBackground.png';

	// Add event listener to listen for tab group close and delete the Meal object
	mcd.app.nutrition.main.tabGroup.addEventListener('close', function() {
		mcd.app.nutrition.totalMealObj = null;
	});

	// Add event listener to listen for tab group close and delete the Meal object
	mcd.app.nutrition.main.windows[1].addEventListener('open', function() {
		if(mcd.config.isNutriInfo === false) {
			userDetails.open();
		}
	});

	mcd.app.nutrition.main.tabGroup.open();

}

