function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.index = Ti.UI.createTabGroup({
        id: "index"
    });
    $.__views.__alloyId10 = Alloy.createController("dashboard", {
        id: "__alloyId10"
    });
    $.__views.__alloyId9 = Ti.UI.createTab({
        window: $.__views.__alloyId10.getViewEx({
            recurse: !0
        }),
        title: "Dashboard",
        icon: "KS_nav_ui.png",
        id: "__alloyId9"
    });
    $.__views.index.addTab($.__views.__alloyId9);
    $.__views.__alloyId14 = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        barColor: "#000000",
        title: "Tab 2",
        id: "__alloyId14"
    });
    $.__views.__alloyId15 = Ti.UI.createLabel({
        top: 50,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 20,
            fontFamily: "Helvetica Neue"
        },
        textAlign: "center",
        text: "I am Window 2",
        id: "__alloyId15"
    });
    $.__views.__alloyId14.add($.__views.__alloyId15);
    $.__views.__alloyId13 = Ti.UI.createTab({
        window: $.__views.__alloyId14,
        title: "Tab 2",
        icon: "KS_nav_views.png",
        id: "__alloyId13"
    });
    $.__views.index.addTab($.__views.__alloyId13);
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