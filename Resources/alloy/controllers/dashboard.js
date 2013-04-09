function Controller() {
    function getDevices() {
        $.devices.headerTitle = "Getting Devices...";
        smart.getHubDevices({
            id: Ti.App.Properties.getString("hub_id"),
            onload: populateDeviceTable
        });
    }
    function populateDeviceTable(data) {
        var rows = [];
        for (i in data) {
            var row = Ti.UI.createTableViewRow({
                color: "#000000",
                title: data[i].label ? "(" + data[i].label + ") " + data[i].name : data[i].name,
                states: data[i].currentStates,
                stateOverrides: data[i].stateOverrides,
                deviceID: data[i].id
            });
            rows.push(row);
        }
        $.devices.headerTitle = "Currently " + rows.length + " Devices";
        $.devices.setData(rows);
    }
    function showDevice(data) {
        smart.showDevice({
            id: data.rowData.deviceID,
            onload: showState
        });
    }
    function showState(data) {
        var switchDialog = Ti.UI.createAlertDialog({
            title: data.device.name,
            message: "Current State: \nStatus is " + data.device.status + "\n",
            buttonNames: [ "Ok" ],
            cancel: 0
        });
        if (data.device.currentStates.length > 0) {
            switchDialog.buttonNames = [ "Ok", "Change" ];
            for (i in data.device.currentStates) switchDialog.message += data.device.currentStates[i].name + " is " + data.device.currentStates[i].value + "\n";
            switchDialog.show();
            switchDialog.addEventListener("click", function(evt) {
                evt.index == 1 && smart.showDeviceType({
                    id: data.device.typeId,
                    onload: function(args) {
                        changeDeviceState(args, data);
                    }
                });
            });
        } else switchDialog.show();
    }
    function changeDeviceState(args, data) {
        var changeDialog = Ti.UI.createOptionDialog({
            title: "Change state of " + data.device.name
        }), options = [];
        for (i in args.supportedCommands) options.push(args.supportedCommands[i].name);
        options.push("cancel");
        changeDialog.canel = options.length - 1;
        changeDialog.destructive = options.length - 1;
        changeDialog.options = options;
        changeDialog.show();
        changeDialog.addEventListener("click", function(evt) {
            evt.index != changeDialog.canel && smart.sendDeviceCommand({
                id: data.device.id,
                body: "{id:" + args.supportedCommands[evt.index].id + "}",
                onload: function(y) {
                    alert("Command Sent");
                }
            });
        });
    }
    function updateHub(evt) {
        if (evt.rowData.hubID != Ti.App.Properties.getString("hub_id")) {
            Ti.App.Properties.setString("hub_id", evt.rowData.hubID);
            getHubs(getDevices);
        }
    }
    function getHubs(callback) {
        smart.getHubs({
            onload: function(data) {
                var rows = [];
                for (i in data) {
                    var row = Ti.UI.createTableViewRow({
                        color: "#000000",
                        title: data[i].name,
                        hubID: data[i].id,
                        locationID: data[i].locationId
                    });
                    rows.push(row);
                }
                $.hubs.headerTitle = rows.length + " Hubs";
                $.hubs.setData(rows);
                Ti.App.Properties.hasProperty("hub_id") || Ti.App.Properties.setString("hub_id", data[0].id);
                callback();
            }
        });
    }
    function setUser(data) {
        if (data.rowData) {
            var tmp = data.rowData;
            data = tmp;
        }
        Ti.App.Properties.setString("user_id", data.user_id);
        Ti.App.Properties.setString("user_name", data.fullName);
        getHubs(getDevices);
    }
    function init() {
        if (!smart.checkAuth) {
            var login = Alloy.createController("login").getView();
            $.dashboard.add(login);
            login.addEventListener("complete", function(data) {
                $.dashboard.remove(login);
                var users = Alloy.Collections.users, user = users.where({
                    permissions: "a"
                });
                $.dashboard.title = "Smart Things: " + user[0].get("fullName");
                getHubs(getDevices);
            });
        } else smart.showAccount({
            onload: setUser
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    Alloy.Collections.instance("users");
    Alloy.Collections.instance("hubs");
    $.__views.dashboard = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        barColor: "#000000",
        navBarHidden: !0,
        tabBarHidden: !0,
        id: "dashboard",
        title: "SmartThings"
    });
    $.addTopLevelView($.__views.dashboard);
    $.__views.hubs = Ti.UI.createTableView({
        top: 0,
        height: 120,
        headerTitle: "Hubs",
        width: "50%",
        right: 0,
        id: "hubs"
    });
    $.__views.dashboard.add($.__views.hubs);
    updateHub ? $.__views.hubs.addEventListener("click", updateHub) : __defers["$.__views.hubs!click!updateHub"] = !0;
    $.__views.users = Ti.UI.createTableView({
        top: 0,
        height: 120,
        headerTitle: "Users",
        width: "50%",
        left: 0,
        id: "users"
    });
    $.__views.dashboard.add($.__views.users);
    var __alloyId6 = function(e) {
        var models = Alloy.Collections.users.models, len = models.length, rows = [];
        for (var i = 0; i < len; i++) {
            var __alloyId4 = models[i];
            __alloyId4.__transform = {};
            var __alloyId5 = Ti.UI.createTableViewRow({
                color: "#000000",
                id: "tableRow",
                title: typeof __alloyId4.__transform.fullName != "undefined" ? __alloyId4.__transform.fullName : __alloyId4.get("fullName"),
                user_id: typeof __alloyId4.__transform.id != "undefined" ? __alloyId4.__transform.id : __alloyId4.get("id"),
                fullName: typeof __alloyId4.__transform.fullname != "undefined" ? __alloyId4.__transform.fullname : __alloyId4.get("fullname"),
                name: typeof __alloyId4.__transform.name != "undefined" ? __alloyId4.__transform.name : __alloyId4.get("name"),
                locked: typeof __alloyId4.__transform.locked != "undefined" ? __alloyId4.__transform.locked : __alloyId4.get("locked"),
                permissions: typeof __alloyId4.__transform.permissions != "undefined" ? __alloyId4.__transform.permissions : __alloyId4.get("permissions")
            });
            rows.push(__alloyId5);
        }
        $.__views.users.setData(rows);
    };
    Alloy.Collections.users.on("fetch destroy change add remove reset", __alloyId6);
    setUser ? $.__views.users.addEventListener("click", setUser) : __defers["$.__views.users!click!setUser"] = !0;
    $.__views.devices = Ti.UI.createTableView({
        top: 155,
        bottom: 0,
        headerTitle: "Devices",
        filterAtribute: "title",
        id: "devices"
    });
    $.__views.dashboard.add($.__views.devices);
    showDevice ? $.__views.devices.addEventListener("click", showDevice) : __defers["$.__views.devices!click!showDevice"] = !0;
    $.__views.deviceSearch = Ti.UI.createSearchBar({
        height: Ti.UI.SIZE,
        top: 115,
        id: "deviceSearch"
    });
    $.__views.dashboard.add($.__views.deviceSearch);
    exports.destroy = function() {
        Alloy.Collections.users.off("fetch destroy change add remove reset", __alloyId6);
    };
    _.extend($, $.__views);
    var smart = require("ti.smart");
    $.devices.search = $.deviceSearch;
    smart.setLogging(!0);
    init();
    __defers["$.__views.hubs!click!updateHub"] && $.__views.hubs.addEventListener("click", updateHub);
    __defers["$.__views.users!click!setUser"] && $.__views.users.addEventListener("click", setUser);
    __defers["$.__views.devices!click!showDevice"] && $.__views.devices.addEventListener("click", showDevice);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;