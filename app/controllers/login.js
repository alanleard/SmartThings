var smart = require("ti.smart");

if(Ti.App.Properties.hasProperty("username")){
    $.username.value = Ti.App.Properties.getString("username");
}
if(Ti.App.Properties.hasProperty("password")){
    $.password.value = Ti.App.Properties.getString("password");
}

function storeAuth(data){
    Ti.App.Properties.setString("username", data.username);
    Ti.App.Properties.setString("password", data.password);
};

function storeUsers(data){
    var users = Alloy.Collections.users;
            
    for(i in data){
        var user = Alloy.createModel("users",data[i]);
        user.save();
        users.add(user);
    }
};

function login(e){
    var userData = {username:$.username.value, password:$.password.value};
    
    //App user data storage (optional)
    storeAuth(userData);
    
    //Module user data storage (required)
    smart.setAuth(userData);
    
    //Set application UI data
    e.source.color = "#ffffff";
    e.source.backgroundColor = "#303030";
    e.source.text = "Logging in...";
    
    //Get user list (each SmartThings account can have multiple users)
    Ti.API.info("Attempting Smart Things Login...");
    smart.getAccounts({
        onload : function(data) {
            Ti.API.info("Login Success...");
            storeUsers(data);
            $.login.fireEvent("complete");
         },
         // function called when an error occurs, including a timeout
         onerror : function(e) {
             Ti.API.debug(e.error);
             alert("Error: "+JSON.stringify(e));
         },
    });
};
