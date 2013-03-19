exports.definition = {
    config: {
        columns: {
            hub_id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            id: "TEXT",
            name: "TEXT",
            locationId: "TEXT",
            firmwareVersion: "TEXT",
            zigbeeId: "TEXT",
            status: "ACTIVE",
            onlineSince: "TEXT",
            signalStrength: "TEXT",
            batteryLevel: "TEXT",
            type: "TEXT",
            virtual: "TEXT",
            permissions: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "hubs",
            idAttribute: "hub_id"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("hubs", exports.definition, []);

collection = Alloy.C("hubs", exports.definition, model);

exports.Model = model;

exports.Collection = collection;