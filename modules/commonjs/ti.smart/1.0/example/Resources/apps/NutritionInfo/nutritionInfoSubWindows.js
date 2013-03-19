var mcd = require('mcd.core');
/**
 * @ignore
 * @description Custom label for header rows.
 * The function creates a reusable UI widget for labels.
 */
var createRowHLabel = function(text, left, width) {
	var label = Ti.UI.createLabel({
		text : text,
		color : mcd.theme.themePrimaryColor,
		font : {
			fontSize : mcd.utils.scale(14, 'h'),
			fontWeight : 'bold'
		},
		textAlign : 'center'
	});
	label.left = mcd.utils.scale(left, 'h');
	label.width = mcd.utils.scale(width, 'h');
	return label;
};

/**
 * @ignore
 * @description Create modal window with all items in user's basket.
 * The function accepts an object regarding the user's meal, and generates and displays a window
 * in the form of a restaurant menu, containing the item details.
 * The user is able to remove items from the meal, and the total item and calorie count
 * is immediately updated.
 * @param {object} menuData Data regarding the items in user's basket.
 */
function createTotalMenu(menuData) {
	// Create background for total menu window
	// Design similar to meal menu
	var mealContainer = Titanium.UI.createView({
		top : mcd.utils.scale(20, 'v'),
		bottom : mcd.utils.scale(20, 'v'),
		left : mcd.utils.scale(20, 'h'),
		right : mcd.utils.scale(20, 'h'),
		clicked : false,
		backgroundImage : '/theme/menu.png'
	});

	var currentMealTableData = [];
	// McDonald's logo on screen
	var mcdLogo = Ti.UI.createView({
		top : mcd.utils.scale(2, 'v'),
		left : mcd.utils.scale(2, 'h'),
		height : mcd.utils.scale(90, 'v'),
		width : mcd.utils.scale(80, 'h'),
		backgroundImage : '/theme/sign_board.png'
	});
	// Menu header
	var headerLabel = Ti.UI.createLabel({
		top : mcd.utils.scale(10, 'v'),
		right : mcd.utils.scale(20, 'h'),
		height : 'auto',
		text : L('menu_header'),
		color : mcd.theme.themePrimaryColor,
		font : {
			fontSize : mcd.utils.scale(16, 'h')
		},
		textAlign : 'right'
	});
	// Use different font for iPhone
	if(mcd.platform.name === 'iphone') {
		headerLabel.font = {
			fontFamily : 'Zapfino',
			fontWeight : 'normal'
		};
	}
	mealContainer.add(mcdLogo);
	mealContainer.add(headerLabel);

	// Item, Quantity Labels
	var labelRow = Ti.UI.createView({
		top : mcd.utils.scale(70, 'v'),
		height : mcd.utils.scale(40, 'v'),
		borderColor : 'transparent'
	});
	var nameLabel = createRowHLabel(L('item'), 10, 150);
	var qtyLabel = createRowHLabel(L('qty'), 150, 40);
	var calLabel = createRowHLabel(L('cal_item'), 200, 60);

	labelRow.add(nameLabel);
	labelRow.add(qtyLabel);
	labelRow.add(calLabel);

	// Populate table data
	for(var m = 0; m < mcd.app.nutrition.totalMealObj.items.length; m++) {
		var row = Ti.UI.createTableViewRow({
			height : mcd.utils.scale(40, 'v'),
			className : 'menu',
			borderColor : 'transparent'
		});
		// Icon to delete item from menu
		var removeItem = Ti.UI.createButton({
			left : mcd.utils.scale(5, 'h'),
			height : mcd.utils.scale(25, 'v'),
			width : mcd.utils.scale(25, 'h'),
			backgroundImage : '/theme/close.png'
		});
		// Item name
		var itemNameLabel = Ti.UI.createLabel({
			left : mcd.utils.scale(40, 'h'),
			width : mcd.utils.scale(100, 'h'),
			text : mcd.app.nutrition.totalMealObj.items[m].itemName,
			color : '#000000',
			font : {
				fontSize : mcd.utils.scale(14, 'h')
			}
		});
		// Quantity of item in meal
		var itemQuantityLabel = Ti.UI.createLabel({
			left : mcd.utils.scale(140, 'h'),
			width : mcd.utils.scale(40, 'h'),
			textAlign : 'center',
			text : mcd.app.nutrition.totalMealObj.items[m].quantity,
			color : '#000000',
			font : {
				fontSize : mcd.utils.scale(14, 'h')
			}
		});
		// Calories per item
		var itemCalLabel = Ti.UI.createLabel({
			left : mcd.utils.scale(190, 'h'),
			width : mcd.utils.scale(60, 'h'),
			textAlign : 'center',
			text : mcd.app.nutrition.totalMealObj.items[m].calories,
			color : '#000000',
			font : {
				fontSize : mcd.utils.scale(14, 'h')
			}
		});
		// Italicize on iPhone
		if(mcd.platform.name === 'iphone') {
			itemNameLabel.font = {
				fontStyle : 'italic'
			};
			itemQuantityLabel.font = {
				fontStyle : 'italic'
			};
			itemCalLabel.font = {
				fontStyle : 'italic'
			};
		}
		row.add(removeItem);
		row.add(itemNameLabel);
		row.add(itemQuantityLabel);
		row.add(itemCalLabel);
		currentMealTableData.push(row);
	}

	// Row to display total values
	var totalRow = Ti.UI.createView({
		bottom : mcd.utils.scale(5, 'v'),
		height : mcd.utils.scale(35, 'v'),
		borderColor : 'transparent'
	});
	// Label with localized text for 'total'
	var nameTotal = Ti.UI.createLabel({
		left : mcd.utils.scale(20, 'h'),
		width : mcd.utils.scale(150, 'h'),
		text : L('total'),
		color : mcd.theme.themePrimaryColor,
		font : {
			fontSize : mcd.utils.scale(14, 'h'),
			fontWeight : 'bold'
		}
	});
	// Total number of items in meal
	var qtyTotal = Ti.UI.createLabel({
		left : mcd.utils.scale(150, 'h'),
		width : mcd.utils.scale(40, 'h'),
		text : mcd.app.nutrition.totalMealObj.totalNumberOfItems,
		textAlign : 'center',
		color : mcd.theme.themePrimaryColor,
		font : {
			fontSize : mcd.utils.scale(14, 'h'),
			fontWeight : 'bold'
		}
	});
	// Total calories in meal
	var calTotal = Ti.UI.createLabel({
		left : mcd.utils.scale(200, 'h'),
		width : mcd.utils.scale(60, 'h'),
		text : mcd.app.nutrition.totalMealObj.totalCalories,
		textAlign : 'center',
		color : mcd.theme.themePrimaryColor,
		font : {
			fontSize : mcd.utils.scale(14, 'h'),
			fontWeight : 'bold'
		}
	});

	totalRow.add(nameTotal);
	totalRow.add(qtyTotal);
	totalRow.add(calTotal);

	// Create table with actual meal data
	var mealDetails = Titanium.UI.createTableView({
		top : mcd.utils.scale(120, 'v'),
		bottom : mcd.utils.scale(60, 'v'),
		left : mcd.utils.scale(10, 'h'),
		right : mcd.utils.scale(10, 'h'),
		backgroundColor : 'transparent',
		borderColor : 'transparent',
		data : currentMealTableData
	});

	// Remove item from list and update total meal info, if the delete button is clicked
	mealDetails.addEventListener('click', function(d) {
		if(d.source === d.row.children[0]) {
			if(d.row.className === 'menu') {
				var itemInd = d.index;
				// Delete the row from table
				mealDetails.deleteRow(d.index);
				// Update all values for meal
				mcd.app.nutrition.totalMealObj.totalNumberOfItems = mcd.app.nutrition.totalMealObj.totalNumberOfItems - mcd.app.nutrition.totalMealObj.items[itemInd].quantity;
				mcd.app.nutrition.totalMealObj.totalCalories = mcd.app.nutrition.totalMealObj.totalCalories - mcd.app.nutrition.totalMealObj.items[itemInd].calories * mcd.app.nutrition.totalMealObj.items[itemInd].quantity;
				mcd.app.nutrition.totalMealObj.totalCarbs = mcd.app.nutrition.totalMealObj.totalCarbs - mcd.app.nutrition.totalMealObj.items[itemInd].carbs * mcd.app.nutrition.totalMealObj.items[itemInd].quantity;
				mcd.app.nutrition.totalMealObj.totalProtein = mcd.app.nutrition.totalMealObj.totalProtein - mcd.app.nutrition.totalMealObj.items[itemInd].protein * mcd.app.nutrition.totalMealObj.items[itemInd].quantity;
				mcd.app.nutrition.totalMealObj.totalFat = mcd.app.nutrition.totalMealObj.totalFat - mcd.app.nutrition.totalMealObj.items[itemInd].fat * mcd.app.nutrition.totalMealObj.items[itemInd].quantity;
				mcd.app.nutrition.totalMealObj.totalSodium = mcd.app.nutrition.totalMealObj.totalSodium - mcd.app.nutrition.totalMealObj.items[itemInd].sodium * mcd.app.nutrition.totalMealObj.items[itemInd].quantity;
				// Remove the item from items array
				mcd.app.nutrition.totalMealObj.items.splice(itemInd, 1);
				Ti.App.fireEvent('calorie_update');
				// Update the quantity and calorie values in total menu
				qtyTotal.text = mcd.app.nutrition.totalMealObj.totalNumberOfItems;
				calTotal.text = mcd.app.nutrition.totalMealObj.totalCalories;
			}
		}
	});

	mealContainer.add(labelRow);
	mealContainer.add(mealDetails);
	mealContainer.add(totalRow);

	return mealContainer;
}

/**
 * @ignore
 * @description Create window containing details about a single menu item.
 * The function accepts details regarding a single menu item. It displays
 * an image of the item, along with its calorie value.
 * It also displays the add-ons that are possible with the item.
 * Some add-ons are selected by default.
 * The user can select the add-ons, and the quantity of the item to be added to the meal.
 * @param {object} itemData Data regarding the menu item.
 * @param {window} callingWindow When closing the item window, close the calling submenu window as well.
 */
function createItemWindow(itemData, callingWindow) {
	var itemTableData = [];
	var itemNutrients = {};
	itemNutrients.calories = itemData.nutrients[0].total;
	itemNutrients.carbs = itemData.nutrients[1].total;
	itemNutrients.protein = itemData.nutrients[2].total;
	itemNutrients.fat = 0;
	itemNutrients.sodium = 0;

	// Label to display calorie count of individual menu item
	var calorieLabelContainer = Ti.UI.createView({
		top : mcd.utils.scale(5, 'v'),
		left : mcd.utils.scale(20, 'h'),
		width : mcd.utils.scale(140, 'h'),
		height : mcd.utils.scale(140, 'v')
	});

	// Label displaying number of calories in meal
	var largeCalorieLabel = mcd.ui.createLargeLabel('', 25, 'center');
	largeCalorieLabel.font = {
		fontSize : mcd.utils.scale(50, 'h'),
		fontWeight : 'bold'
	};
	largeCalorieLabel.text = itemNutrients.calories.toFixed(0);
	// Static label displaying the localized string 'calories'
	var staticLabel = mcd.ui.createLargeLabel(L('cal'), 75, 'center');

	calorieLabelContainer.add(largeCalorieLabel);
	calorieLabelContainer.add(staticLabel);

	var itemImage = Ti.UI.createView({
		top : mcd.utils.scale(15, 'v'),
		right : mcd.utils.scale(30, 'h'),
		height : mcd.utils.scale(120, 'v'),
		width : mcd.utils.scale(120, 'h'),
		backgroundImage : itemData.images.small_image
	});

	// Array of objects making up the view
	var menuItemUIObjects = [calorieLabelContainer, itemImage];

	// Create new window to be opened within same tab, and hold menu item data
	var itemWindow = mcd.ui.constructWindow(itemData.Key, 'single', menuItemUIObjects);
	// If the menu item has an array for add-ons
	if(itemData.addons) {
		var tableRows = [];
		var tableHeight = 0;
		// If the add-ons array has valid data (non-empty array)
		if(itemData.addons.length > 0) {
			// Create a row for each add-on
			for(var i = 0; i < itemData.addons.length; i++) {
				var row = Titanium.UI.createTableViewRow({
					className : 'addons',
					addon : itemData.addons[i],
					rowID : i,
					selected : itemData.addons[i].selected
				});
				row.height = mcd.utils.scale(44, 'v');
				row.backgroundImage = mcd.theme.tableBackground;
				// Create radio button for each add-on
				// Image will depend on whether add-on is selected by default or not
				row.radioButton = Ti.UI.createButton({
					right : mcd.utils.scale(20, 'h'),
					height : mcd.utils.scale(30, 'v'),
					width : mcd.utils.scale(30, 'h'),
					backgroundImage : (itemData.addons[i].selected === 'yes') ? '/theme/radio_btn_selected.png' : '/theme/radio_btn.png'
				});
				// Name of add-on
				var dataCol = mcd.ui.createLargeLabel(itemData.addons[i].Key, 0, 'left');
				dataCol.height = mcd.utils.scale(40, 'v');
				dataCol.width = mcd.utils.scale(200, 'h');
				dataCol.left = mcd.utils.scale(10, 'h');
				dataCol.top = mcd.utils.scale(2, 'v');
				dataCol.font = {
					fontSize : mcd.utils.scale(14, 'h')
				};
				dataCol.color = '#8c1717';

				row.add(dataCol);
				row.add(row.radioButton);

				tableRows.push(row);
				tableHeight += row.height;

				// Add to the tableHeight to account for header
				tableHeight += mcd.utils.scale(50, 'v');
			}
		}
		// Create heading background for add-ons section
		var headerView = Ti.UI.createView({
			backgroundColor : mcd.theme.themePrimaryColor,
			height : mcd.utils.scale(30, 'v')
		});
		// Heading for add-ons section
		var headerLabel = mcd.ui.createStandardLabel(L('add_ons'), 5, 'left');
		headerLabel.left = mcd.utils.scale(10, 'h');
		headerView.add(headerLabel);
		// Add-ons section (as table)
		var itemMenuTable = Titanium.UI.createTableView({
			data : tableRows,
			headerView : headerView,
			height : (tableHeight < 165 * mcd.platform.scalingFactors[0]) ? tableHeight : 165 * mcd.platform.scalingFactors[0],
			width : mcd.platform.size.width * 9 / 10,
			borderRadius : 8,
			top : mcd.utils.scale(140, 'v')
		});
		// If add-on is selected, deselect on click and vice versa
		// Also update all calorie values, etc
		itemMenuTable.addEventListener('click', function(e) {
			var rowInd = e.index;
			if(e.row.selected === 'yes') {
				e.row.selected = 'no';
				e.row.radioButton.backgroundImage = '/theme/radio_btn.png';
				itemNutrients.calories = itemNutrients.calories - itemData.addons[rowInd].Calories;
				itemNutrients.carbs = itemNutrients.carbs - itemData.addons[rowInd].Carbohydrates;
				itemNutrients.protein = itemNutrients.protein - itemData.addons[rowInd].Protein;
				largeCalorieLabel.text = itemNutrients.calories.toFixed(0);
			} else {
				e.row.selected = 'yes';
				e.row.radioButton.backgroundImage = '/theme/radio_btn_selected.png';
				itemNutrients.calories = itemNutrients.calories + itemData.addons[rowInd].Calories;
				itemNutrients.carbs = itemNutrients.carbs + itemData.addons[rowInd].Carbohydrates;
				itemNutrients.protein = itemNutrients.protein + itemData.addons[rowInd].Protein;
				largeCalorieLabel.text = itemNutrients.calories.toFixed(0);
			}
		});

		itemWindow.add(itemMenuTable);
	}

	// Section where user can select number of items to add, and choose to add to meal
	var addContainer = Ti.UI.createView({
		width : mcd.platform.size.width,
		height : mcd.utils.scale(50, 'v'),
		backgroundColor : '#000000',
		layout : 'horizontal'
	});
	addContainer.bottom = 0;
	// Number of quantities to add
	var itemQuantity = mcd.ui.createStandardTextBox('', 10, 15, 35, 50);
	itemQuantity.textAlign = Titanium.UI.TEXT_ALIGNMENT_CENTER;
	itemQuantity.keyboardType = Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION;
	// Default to 1 item
	itemQuantity.value = '1';
	// Allow only numbers as input
	mcd.utils.forceNumeric(itemQuantity);
	// Restrict input to 3 digits
	mcd.utils.limitInput(itemQuantity, 3);

	// Minus button
	var minusButton = Titanium.UI.createButton({
		backgroundImage : '/theme/minus.png',
		height : mcd.utils.scale(35, 'v'),
		width : mcd.utils.scale(35, 'h'),
		left : mcd.utils.scale(10, 'h'),
		top : mcd.utils.scale(5, 'v')
	});

	// Plus button
	var plusButton = Titanium.UI.createButton({
		backgroundImage : '/theme/plus.png',
		height : mcd.utils.scale(35, 'v'),
		width : mcd.utils.scale(35, 'h'),
		left : mcd.utils.scale(15, 'h'),
		top : mcd.utils.scale(5, 'v')
	});
	// Decrement value on click of minus button
	minusButton.addEventListener('click', function() {
		var numOfItems = parseInt(itemQuantity.value, 10);
		if(numOfItems > 0) {
			numOfItems = numOfItems - 1;
			itemQuantity.value = numOfItems.toFixed(0);
		} else {
			itemQuantity.value = '0';
		}
	});
	// Increment value on click of plus button
	plusButton.addEventListener('click', function() {
		var numOfItems = parseInt(itemQuantity.value, 10);
		if(numOfItems >= 0) {
			numOfItems = numOfItems + 1;
			itemQuantity.value = numOfItems.toFixed(0);
		} else {
			itemQuantity.value = '0';
		}
	});

	// Button to enable user to add item to meal
	var addToMeal = mcd.ui.createStandardButton(L('add_to_meal'), 10, 15, 30, 120);
	// On clicking the Add button
	addToMeal.addEventListener('click', function() {
		// If valid number was given (not blank text box)
		if(itemQuantity.value>0) {
			var numOfItems = parseInt(itemQuantity.value, 10);
			if(numOfItems > 0) {
				// Create an object with details of the item
				var itemDetails = {};
				itemDetails.itemName = itemData.Key;
				itemDetails.quantity = numOfItems;
				itemDetails.calories = itemNutrients.calories;
				itemDetails.carbs = itemNutrients.carbs;
				itemDetails.protein = itemNutrients.protein;
				itemDetails.fat = itemNutrients.fat;
				itemDetails.sodium = itemNutrients.sodium;
				mcd.app.nutrition.totalMealObj.items.push(itemDetails);
				// Update total meal info
				mcd.app.nutrition.totalMealObj.totalCalories += itemNutrients.calories * numOfItems;
				mcd.app.nutrition.totalMealObj.totalProtein += itemNutrients.protein * numOfItems;
				mcd.app.nutrition.totalMealObj.totalFat += itemNutrients.fat * numOfItems;
				mcd.app.nutrition.totalMealObj.totalCarbs += itemNutrients.carbs * numOfItems;
				mcd.app.nutrition.totalMealObj.totalSodium += itemNutrients.sodium * numOfItems;
				mcd.app.nutrition.totalMealObj.totalNumberOfItems += numOfItems;
				Ti.API.info('Total Calories in Meal: ' + mcd.app.nutrition.totalMealObj.totalCalories);
				Ti.App.fireEvent('calorie_update');
				// Close the window that brought us to the item detail window
				// This is so that the user is taken back to the main categories menu
				callingWindow.close();
				// Close the item detail window
				itemWindow.close();
			}
			// If zero items have been specified, simply close the windows
			else {
				callingWindow.close();
				itemWindow.close();
			}
		}
		// If user has not provided any input
		else {
			var noInput = mcd.ui.createAlert(L('field_invalid'));
			noInput.show();
		}

	});

	addContainer.add(minusButton);
	addContainer.add(itemQuantity);
	addContainer.add(plusButton);
	addContainer.add(addToMeal);
	itemWindow.add(addContainer);

	mcd.ui.handleKeypadInput(itemQuantity, addContainer, 165);

	itemWindow.backgroundImage = '/theme/imgMealBuilderBackground.png';

	return itemWindow;
}

/**
 * @ignore
 * @description Create subwindow containing items within a menu category.
 * The function creates a window containing a table, which contains details regarding the
 * menu items within a category.
 * The UI is similar to that of the main meal builder window.
 * @param {string} title Title of window.
 * @param {object} subMenuData Data regarding menu items.
 */
function createSubWindow(title, subMenuData) {
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
	var calorieLabel = mcd.ui.createLargeLabel('', 50, 'center');
	calorieLabel.text = L('cal');
	calorieLabel.font = {
		fontSize : mcd.utils.scale(24, 'h'),
		fontWeight : 'bold'
	};

	calorieCountImage.add(calorieCountLabel);
	calorieCountImage.add(calorieLabel);

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
	var itemStaticLabel = mcd.ui.createStandardLabel(L('items'), 50, 'center');
	itemStaticLabel.color = '#8c1717';

	itemCountImage.add(itemCountLabel);
	itemCountImage.add(itemStaticLabel);

	var subTableData = [];
	for(var j = 0; j < subMenuData.length; j++) {
		var subMenuRowData = {};
		subMenuRowData.label = subMenuData[j].Key;
		subMenuRowData.image = subMenuData[j].images.small_image;
		subTableData.push(subMenuRowData);
	}

	// Array of UIObjects required for sub-menu  tab
	var subMenuUIObjects = [calorieCountImage, itemCountImage];

	// Create new window to be opened within same tab, and hold sub-menu data
	var subMenuWindow = mcd.ui.constructWindow(title, 'single', subMenuUIObjects);
	subMenuWindow.backgroundImage = '/theme/imgMealBuilderBackground.png';

	// Create table with sub-menu items
	var subMenuTable = mcd.ui.createTable(subTableData, 'imageLabel');
	subMenuTable.width = mcd.platform.size.width * 9 / 10;
	subMenuTable.top = mcd.utils.scale(120, 'h');
	subMenuTable.borderRadius = 8;
	subMenuTable.backgroundColor = 'transparent';
	subMenuWindow.add(subMenuTable);

	subMenuTable.addEventListener('click', function(g) {
		var subRowIndex = g.index;
		var itemData = subMenuData[subRowIndex];
		var itemWindow = createItemWindow(itemData, subMenuWindow);
		mcd.app.nutrition.main.tabs[0].open(itemWindow);
	});

	var mealDetailContainer = mcd.ui.constructWindow(L('your_meal'), 'modal', []);

	var totalMenu = createTotalMenu();
	// Bring up the total meal details when the grocery bag image is clicked
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

	// Listen for update in meal, and update the calorie and item count labels
	Ti.App.addEventListener('calorie_update', function() {
		calorieCountLabel.text = mcd.app.nutrition.totalMealObj.totalCalories.toFixed(0);
		itemCountLabel.text = mcd.app.nutrition.totalMealObj.totalNumberOfItems.toFixed(0);
	});
	return subMenuWindow;
}

