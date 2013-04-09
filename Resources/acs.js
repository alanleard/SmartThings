var Cloud = require("ti.cloud");

module.exports = {
    login: function(callback) {
        Cloud.Users.login({
            login: "smartthings",
            password: "password"
        }, function(e) {
            callback(n);
            Ti.API.info("ACS Login: " + JSON.stringify(n));
        });
    },
    pushSubscribe: function(callback) {
        Cloud.PushNotifications.subscribe({
            channel: "smartapp",
            device_token: Ti.App.Properties.getString("device_token"),
            type: "ios"
        }, function(e) {
            callback(e);
            Ti.API.info("ACS Subscribe: " + JSON.stringify(e));
        });
    },
    getDeviceToken: function(callback) {}
};