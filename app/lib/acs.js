var Cloud = require("ti.cloud");

module.exports = {
    login: function(callback){
        
        Cloud.Users.login({
            login: 'smartthings',
            password: 'password'
        }, function (e) {
            callback(n);
            Ti.API.info("ACS Login: "+JSON.stringify(n))
        });
        
    },
    pushSubscribe: function (callback){

        Cloud.PushNotifications.subscribe({
            channel: 'smartapp',
            device_token: Ti.App.Properties.getString("device_token"),
            type:'ios'
        }, function (e) {
            callback(e);
            Ti.API.info("ACS Subscribe: "+JSON.stringify(e))
        });

    },
    getDeviceToken: function(callback){
        Ti.API.info("REGISTERING LOCAL PUSH");
        Titanium.Network.registerForPushNotifications({
            types: [
                Titanium.Network.NOTIFICATION_TYPE_BADGE,
                Titanium.Network.NOTIFICATION_TYPE_ALERT,
                Titanium.Network.NOTIFICATION_TYPE_SOUND
            ],
            success:function(e)
            {
                Ti.App.Properties.setString("device_token",e.deviceToken);
                callback(e.deviceToken);
            },
            error:function(e)
            {
                alert("Error during registration: "+e.error);
            },
            callback:function(e)
            {
            // called when a push notification is received.
                //alert("Received a push notification\n\nPayload:\n\n"+JSON.stringify(e.data));
                var alertDialog = Ti.UI.createAlertDialog({
                    title:"SmartThings Notification",
                    message:e.data.alert
                });
                alertDialog.show();   
            }});
    
    }
}