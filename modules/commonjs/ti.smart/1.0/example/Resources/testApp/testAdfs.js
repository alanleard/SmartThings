Ti.include('lib/core/adfs.js')

var win = Ti.UI.createWindow({
	backgroundColor : 'white'
});


var adfs = mcd.adfs.adfsWebView();

win.add(adfs);

win.open();
