Ti.include('lib/presentation/ui.js')

var rowOne = {
	label : 'Table Row 1',
	image : '/theme/icon_juice.png'
};
var rowTwo = {
	label : 'Table Row 2',
	image : '/theme/icon_juice.png'
};
var tableData = [rowOne, rowTwo];
var table = mcd.ui.createTable(tableData, 'imageLabel');

var win1 = Ti.UI.createWindow();
win1.backgroundImage = mcd.theme.imgPlainBackground
win1.add(table);

var currView = Ti.UI.createView({
	height : 200,
	width : 200,
	backgroundColor : 'white'
});
win1.add(currView);
var view1 = Ti.UI.createView({
	height : 200,
	width : 200,
	backgroundColor : 'black'
});
var view2 = Ti.UI.createView({
	height : 200,
	width : 200,
	backgroundColor : 'red'
});
var buttons = [{
	label : 'ButtonOne',
	view : view1
}, {
	label : 'ButtonTwo',
	view : view2
}];
var btnBar = mcd.ui.createButtonBar(buttons, currView, 1);
btnBar.top = mcd.utils.scale(100, 'v');
win1.add(btnBar);

var container = Ti.UI.createView({
	width : mcd.platform.size.width,
	height : mcd.utils.scale(40, 'v'),
	backgroundColor : mcd.theme.themePrimaryColor,
	layout : 'horizontal'
});
container.bottom = mcd.utils.scale(20, 'v');
var txtBox = mcd.ui.createStandardTextBox(L('enter value'), 5, 15, 35, 180);
var btn = mcd.ui.createStandardButton('Button', 5, 15, 30, 100);
btn.keyboardType = Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION;
container.add(txtBox);
container.add(btn);

win1.add(container);
mcd.ui.handleKeypadInput(txtBox, container);

var indicator = mcd.ui.createMaskLoadingIndicator("Test Loading...");
if(Ti.Platform.osname === 'android') {
	indicator.show();
} else if(Ti.Platform.osname === 'iphone') {
	if(win1 !== null) {
		win1.add(indicator);
	}
}
setTimeout(function() {
	indicator.hide();
}, 1000)
win1.open();

