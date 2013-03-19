exports.definition = {
    config: {
        columns: {
            user_id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            id: "TEXT",
            name: "TEXT",
            fullName: "TEXT",
            locked: "TEXT",
            permissions: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "users",
            idAttribute: "user_id"
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

model = Alloy.M("users", exports.definition, []);

collection = Alloy.C("users", exports.definition, model);

exports.Model = model;

exports.Collection = collection;