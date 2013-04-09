function Controller() {
    function storeAuth(data) {
        Ti.App.Properties.setString("username", data.username);
        Ti.App.Properties.setString("password", data.password);
    }
    function storeUsers(data) {
        var users = Alloy.Collections.users;
        for (i in data) {
            var user = Alloy.createModel("users", data[i]);
            user.save();
            users.add(user);
        }
    }
    function login(e) {
        var userData = {
            username: $.username.value,
            password: $.password.value
        };
        storeAuth(userData);
        smart.setAuth(userData);
        e.source.color = "#ffffff";
        e.source.backgroundColor = "#303030";
        e.source.text = "Logging in...";
        Ti.API.info("Attempting Smart Things Login...");
        smart.getAccounts({
            onload: function(data) {
                Ti.API.info("Login Success...");
                storeUsers(data);
                $.login.fireEvent("complete");
            },
            onerror: function(e) {
                Ti.API.debug(e.error);
                alert("Error: " + JSON.stringify(e));
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.login = Ti.UI.createScrollView({
        backgroundColor: "white",
        layout: "vertical",
        top: 10,
        id: "login"
    });
    $.addTopLevelView($.__views.login);
    $.__views.logo = Ti.UI.createImageView({
        image: "logo.png",
        top: 20,
        left: 50,
        right: 50,
        id: "logo"
    });
    $.__views.login.add($.__views.logo);
    $.__views.username = Ti.UI.createTextField({
        top: 30,
        width: 280,
        height: 60,
        borderWidth: 1,
        borderColor: "#707070",
        paddingRight: 10,
        paddingLeft: 10,
        hintText: "Email",
        id: "username"
    });
    $.__views.login.add($.__views.username);
    $.__views.password = Ti.UI.createTextField({
        top: 30,
        width: 280,
        height: 60,
        borderWidth: 1,
        borderColor: "#707070",
        paddingRight: 10,
        paddingLeft: 10,
        passwordMask: !0,
        hintText: "Password",
        id: "password"
    });
    $.__views.login.add($.__views.password);
    login ? $.__views.password.addEventListener("return", login) : __defers["$.__views.password!return!login"] = !0;
    $.__views.submit = Ti.UI.createLabel({
        top: 40,
        width: 220,
        height: 35,
        backgroundColor: "#707070",
        color: "#000000",
        borderColor: "#707070",
        textAlign: "center",
        text: "Login",
        id: "submit"
    });
    $.__views.login.add($.__views.submit);
    login ? $.__views.submit.addEventListener("touchstart", login) : __defers["$.__views.submit!touchstart!login"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var smart = require("ti.smart");
    Ti.App.Properties.hasProperty("username") && ($.username.value = Ti.App.Properties.getString("username"));
    Ti.App.Properties.hasProperty("password") && ($.password.value = Ti.App.Properties.getString("password"));
    __defers["$.__views.password!return!login"] && $.__views.password.addEventListener("return", login);
    __defers["$.__views.submit!touchstart!login"] && $.__views.submit.addEventListener("touchstart", login);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;