// This is a test harness for your module
// You should do something interesting in this harness 
// to test out the module and to provide instructions 
// to users on how to use it by example.


// open a single window
var window = Ti.UI.createWindow({
	backgroundColor:'white'
});
var label = Ti.UI.createLabel();
window.add(label);
window.open();

// TODO: write your module tests here
var encryption = require('mcdonalds.module.android.encryption');
Ti.API.info("module is => " + encryption);

var stringToEncrypt = "Helloworld, test encryption";
var key = "McDonald";

Ti.API.info("/*************** calling encryptSting **************/");
var encryptedString = encryption.encryptString(stringToEncrypt,key);
Ti.API.info("encryptedString is => " + encryptedString);

Ti.API.info("/*************** calling decryptString **************/");
var decrptedString  = encryption.decryptString(encryptedString, key);
Ti.API.info("decrptedString is => " + decrptedString);

label.text = "Check Log Message";
