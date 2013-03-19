//This is a test harness for your module
//You should do something interesting in this harness 
//to test out the module and to provide instructions 
//to users on how to use it by example.


//TODO: write your module tests here
var sessionmgmt = require('mcdonalds.module.android.sessionmgmt');
Ti.API.info("module is => " + sessionmgmt);


//open a single window
var window = Ti.UI.createWindow({
	backgroundColor:'black'
});
//create a close button
var button = Titanium.UI.createButton({ title: 'close', height:30, width:100, top:0 });
//button event handler
button.addEventListener('click',function(e) {  
Ti.API.info("Inside button click event handler");
sessionmgmt.removeAllCookies();

});
//web view
var webview = Titanium.UI.createWebView({url:'http://google.com/', top:40, height:'90%'}); 
window.add(webview);
window.add(button);
window.open();
