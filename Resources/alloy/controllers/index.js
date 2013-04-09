function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.index = Ti.UI.createTabGroup({
        navBarHidden: "true",
        id: "index"
    });
    $.__views.__alloyId9 = Alloy.createController("dashboard", {
        id: "__alloyId9"
    });
    $.__views.__alloyId8 = Ti.UI.createTab({
        window: $.__views.__alloyId9.getViewEx({
            recurse: !0
        }),
        title: "SmartThings",
        icon: "KS_nav_ui.png",
        id: "__alloyId8"
    });
    $.__views.index.addTab($.__views.__alloyId8);
    $.__views.__alloyId13 = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        barColor: "#000000",
        navBarHidden: !0,
        tabBarHidden: !0,
        title: "SmartApps",
        id: "__alloyId13"
    });
    $.__views.__alloyId14 = Ti.UI.createLabel({
        top: 50,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "Placeholder for SmartApps...",
        id: "__alloyId14"
    });
    $.__views.__alloyId13.add($.__views.__alloyId14);
    $.__views.__alloyId12 = Ti.UI.createTab({
        window: $.__views.__alloyId13,
        title: "SmartApps",
        icon: "KS_nav_views.png",
        id: "__alloyId12"
    });
    $.__views.index.addTab($.__views.__alloyId12);
    $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var acs = require("acs");
    $.index.open();
    acs.login(acs.getDeviceToken(acs.pushSubscribe));
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;