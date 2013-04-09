var smart = require("ti.smart");

$.devices.search = $.deviceSearch;
// var search = Ti.UI.createSearchBar();
// $.devices.applyProperties({
    // filterAtribute:"title",
    // search:search
// });

smart.setLogging(true);

init();

function getDevices(){
    $.devices.headerTitle ="Getting Devices..."

    smart.getHubDevices({
        id:Ti.App.Properties.getString("hub_id"),
        onload: populateDeviceTable  
    });
}

function populateDeviceTable(data){
    var rows = [];
    for(i in data){
        var row = Ti.UI.createTableViewRow({
            color:"#000000",
            title:data[i].label?"("+data[i].label+") "+data[i].name:data[i].name,
                states:data[i].currentStates,
                stateOverrides:data[i].stateOverrides,
                deviceID:data[i].id
            });
            rows.push(row);    
    }
    
    $.devices.headerTitle ="Currently "+rows.length+" Devices"
    $.devices.setData(rows);
};

function showDevice(data){
    smart.showDevice({
        id:data.rowData.deviceID,
        onload:showState
    }); 
};

function showState(data){
    var switchDialog = Ti.UI.createAlertDialog({
        title:data.device.name,
        message:"Current State: \nStatus is "+data.device.status+"\n",
        buttonNames:["Ok"],
        cancel:0
    });

    if(data.device.currentStates.length>0){
        switchDialog.buttonNames = ["Ok","Change"];
        
        for( i in data.device.currentStates ){
            switchDialog.message+= data.device.currentStates[i].name +" is "+data.device.currentStates[i].value+"\n";
        }

        switchDialog.show();
        switchDialog.addEventListener("click", function(evt){
            if(evt.index == 1){ 
                smart.showDeviceType({
                    id:data.device.typeId,
                    onload:function(args){
                        changeDeviceState(args,data);
                    }
                });
            }
        });
        
    } else {
        switchDialog.show();
    }   
};

function changeDeviceState(args,data){

    var changeDialog = Ti.UI.createOptionDialog({
        title:"Change state of "+data.device.name,
    });
    var options = [];
    for(i in args.supportedCommands){
        options.push(args.supportedCommands[i].name)
    }
    options.push("cancel");
    changeDialog.canel = options.length-1;
    changeDialog.destructive = options.length-1;
    changeDialog.options = options;
    changeDialog.show();
    
    changeDialog.addEventListener("click", function(evt){
        if(evt.index != changeDialog.canel){
            
            smart.sendDeviceCommand({
                id:data.device.id,
                body:"{id:"+args.supportedCommands[evt.index].id+"}",
                onload:function(y){
                    alert("Command Sent")
                }
            });
            
        }
    })
}

function updateHub(evt){
    if(evt.rowData.hubID!=Ti.App.Properties.getString("hub_id")){
        Ti.App.Properties.setString("hub_id", evt.rowData.hubID);
        getHubs(getDevices);
    }
}

function getHubs(callback){  
    smart.getHubs({
        onload:function(data){
            var rows = [];
            for(i in data){
                var row = Ti.UI.createTableViewRow({
                    color:"#000000",
                    title:data[i].name,
                    hubID:data[i].id,
                    locationID:data[i].locationId
                });
                rows.push(row);    
            }
            $.hubs.headerTitle =rows.length+" Hubs"
            $.hubs.setData(rows);
            if(!Ti.App.Properties.hasProperty("hub_id")){
                Ti.App.Properties.setString("hub_id",data[0].id);
            }
            callback();
        }
    });
}

function setUser(data){
    if(data.rowData){
        var tmp = data.rowData;
        data = tmp;
    }
    
    Ti.App.Properties.setString("user_id",data.user_id );
    Ti.App.Properties.setString("user_name",data.fullName );
    getHubs(getDevices);
}

function init(){
    if(!smart.checkAuth){
        var login = Alloy.createController("login").getView();
        $.dashboard.add(login);
        
        login.addEventListener("complete", function(data){
            
            $.dashboard.remove(login);
            var users = Alloy.Collections.users;
            var user = users.where({permissions:"a"});
            $.dashboard.title = "Smart Things: "+user[0].get("fullName");
            getHubs(getDevices);
        });
           
    } else {
        smart.showAccount({
            onload:setUser
        });
    }
}