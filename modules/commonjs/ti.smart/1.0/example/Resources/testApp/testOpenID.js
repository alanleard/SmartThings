Ti.include('lib/core/openid.js')

var win = Ti.UI.createWindow({
	backgroundColor : 'white'
});


var openID = mcd.openId.openIdWebView()

win.add(openID);

win.open();
