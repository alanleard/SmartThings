var mcd = require('mcd.core');
(function() {
	
	var uiObjects = [];
	
	/*
	* The demo application uses a set of  standard positioning lines
	* to make the position comparison between screens clear.
	* There are 7 horizontal reference line and a single vertical reference line.
	* A 'position' theme has been defined for convenience to prevent code repetition.
	*/

	// Load a local theme, this is a theme defined on theme.js
	var selectedTheme = mcd.theme.ordering;

	// The position parameters common to all the widgets
	var position = {
		left : 10,
		width : 300,
		height : 40
	};

	// define a set of themes for testing.

	var redButtonTheme = {
		backgroundImage : '/apps/testWidgets/ButtonRedLarge.png',
		backgroundSelectedColor : '#841111',
		color : '#EEE'
	};
	var redSmallButtonTheme = {
		backgroundImage : '/apps/testWidgets/ButtonRedSmall.png',
		backgroundSelectedColor : '#841111',
		color : '#EEE'
	};

	var buttonTheme = {
		color : '#EEE',
		borderRadius : 5
	};

	// Create a Window to Hold the UI components//
	var homeWin = mcd.ui.createWindow({
		children : uiObjects,
		title : 'Testing UI Components',
		backgroundImage : '/apps/testWidgets/red-bg.png',
		navBarHidden : true
	});

	/*
	 * start of creating horizontal and vertical reference lines.
	 * These lines are used as a reference to compare UI component positioning
	 * between screen types.
	 */

	/*
	 * Internal function
	 * This function is used to create horizontal reference lines across the screen
	 * The lines can be used as an reference to the scaling between various screen sizes
	 *
	 */
	function createRefLine(top) {
		var view = Ti.UI.createView({
			width : '100%',
			left : 0,
			top : top,
			height : '0.3%',
			backgroundColor : '#37FF00',
			opacity : 0.5
		});
		homeWin.add(view);
	}

	/*
	 * create reference lines
	 */
	var hRef1 = createRefLine('12.5%');
	var hRef2 = createRefLine('25%');
	var hRef3 = createRefLine('37.5%');
	var hRef4 = createRefLine('50%');
	var hRef5 = createRefLine('62.5%');
	var hRef6 = createRefLine('75%');
	var hRef7 = createRefLine('87.5%');

	// create the vertical reference line

	var vRef = Ti.UI.createView({
		width : '0.4%',
		left : '50%',
		top : 0,
		height : '100%',
		backgroundColor : '#37FF00',
		opacity : 0.5
	});

	/*
	 * End of creating horizontal and vertical reference lines
	 */

	homeWin.add(vRef);

	// Create a label apply a local theme from theme.js
	var label = mcd.ui.createLabel({
		theme : [selectedTheme.label, position],
		text : '  McDonald\'s Label',
		scale : 'x',
		top : 40
	});
	homeWin.add(label);

	// Create a text field and apply a local theme from theme.js
	var textField = mcd.ui.createTextField({
		theme : [selectedTheme.textField, position],
		scale : 'x',
		top : 100,
		hintText : 'McDonald\'s Text field'
	});
	homeWin.add(textField);

	// Create a button and apply a theme defined on the current script
	var btn = mcd.ui.createButton({
		theme : [redButtonTheme, position],
		scale : 'x',
		top : 160,
		height : 40,
		title : 'Button'
	});
	homeWin.add(btn);

	/*
	 * Button bar example
	 */
	var btnBar = mcd.ui.createButtonBar({
		theme : [redSmallButtonTheme, position],
		scale : 'x',
		labels : ['ONE', 'TWO', 'THREE'],
		top : 220,
		backgroundColor : 'red',
		style : Titanium.UI.iPhone.SystemButtonStyle.BAR
	});
	homeWin.add(btnBar);
	//Create a listener to the button bar
	btnBar.addEventListener('click', function(e) {
		if(mcd.platform.name === 'iphone') {
			alert('Button Bar Clicked. Click index : ' + e.index);
		} else {
			alert('Button Bar Clicked. Click index : ' + e.source.index);
		}
	});
	/*
	* End of button bar example
	*/

	/*
	* Tabbed bar example
	*/
	// Create a tabbed bar and apply a theme defined on the current script
	var tabbedBar = mcd.ui.createTabbedBar({
		theme : [buttonTheme, position],
		scale : 'x',
		labels : ['ONE', 'TWO', 'THREE'],
		backgroundColor : '#CB0909',
		backgroundSelectedColor : '#9E0000',
		top : 280,
		style : Titanium.UI.iPhone.SystemButtonStyle.BAR
	});
	homeWin.add(tabbedBar);

	tabbedBar.addEventListener('click', function(e) {
		if(mcd.platform.name === 'iphone') {
			alert('Tabbed Bar Clicked. Click index : ' + e.index);
		} else {
			alert('Tabbed Bar Clicked. Click index : ' + e.source.index);
		}
	});
	/*
	 * End of Tabbed bar example
	 */

	/*
	 * Tool bar example
	 */

	var toolBarBtns = [];

	/*
	 * The tabbed bar buttons are created as follows.
	 * The iPhone supports System buttons and they have been used for iPhone
	 * For Android, mcd.ui.createButton() has been used to create buttons
	 */

	if(mcd.platform.name === 'iphone') {
		var send = Titanium.UI.createButton({
			title : 'Send'
		});

		var camera = Titanium.UI.createButton({
			title : 'Camera'
		});

		var cancel = Titanium.UI.createButton({
			title : 'Cancel'
		});

		var flexSpace = Titanium.UI.createButton({
			systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});
		toolBarBtns = [send, flexSpace, camera, flexSpace, cancel];
	} else {
		var send = mcd.ui.createButton({
			theme : [selectedTheme.toolBar],
			title : 'Send',
			scale : 'x',
			left : 2
		});
		var camera = mcd.ui.createButton({
			theme : [selectedTheme.toolBar],
			title : 'camera',
			scale : 'x',
			left : 115
		});

		var cancel = mcd.ui.createButton({
			theme : [selectedTheme.toolBar],
			title : 'cancel',
			scale : 'x',
			right : 2
		});
		toolBarBtns = [send, camera, cancel];
	}

	var toolBar = mcd.ui.createToolbar({
		theme : [position],
		scale : 'x',
		items : toolBarBtns,
		top : 340,
		barColor : '#CB0909',
		borderRadius : 5
	});
	homeWin.add(toolBar);

	/*
	* End of Tabbed bar example
	*/

	// Create a password field  with default theme
	var passwordField = mcd.ui.createPasswordField({
		left : 10,
		width : 300,
		height : 40,
		scale : 'x',
		top : 400,
		hintText : 'McDonald\'s Password'
	});
	homeWin.add(passwordField);

	var serarchBar = mcd.ui.createSearchBar({
		theme : [{
			top : 180
		}, {
			left : 0
		}],
		hintText : 'Search ',
		width : 'auto',
		height : 50
	});

	/*
	 * Set up the window properties and open up the window
	 */
	homeWin.fullscreen = true;
	homeWin.navBarHidden = true;
	homeWin.open();

	// Create a toast
	var toast = mcd.ui.createNotification({
		message : 'McDonald\'s Notification',
		bottom : 240,
		duration : Ti.UI.NOTIFICATION_DURATION_LONG
	}, homeWin);
	
	// For Android
	if(Ti.Platform.osname === 'android') {
		toast.show();
	}

})();
