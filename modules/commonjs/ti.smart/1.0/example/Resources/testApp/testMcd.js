Ti.include('global.js')

var win = Ti.UI.createWindow({
	backgroundColor : 'white'
});

try {
	throw new mcd.error('threw an error', 'from error', mcd.constant.ERROR);
} catch (e) {
	alert(e.userMessage);

}
mcd.logError("from logError");
mcd.log(mcd.constant.INFO, "from log");
mcd.logInfo("from logInfo");
mcd.notify('alert', 'from notify');

win.open(); 