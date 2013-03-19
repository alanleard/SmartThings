exports.definition = {
	config: {
		columns: {
		    "user_id":"INTEGER PRIMARY KEY AUTOINCREMENT",
		    "id": "TEXT",
		    "name": "TEXT",
		    "fullName": "TEXT",
		    "locked": "TEXT",
		    "permissions" : "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "users",
			idAttribute:"user_id"
		}
	},		
	extendModel: function(Model) {		
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});
		
		return Model;
	},
	extendCollection: function(Collection) {		
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});
		
		return Collection;
	}
}

