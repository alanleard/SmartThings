var win = mcd.ui.constructWindow('buttonBarTest','single',[]);
var currView = Ti.UI.createView({height:200,width:200,backgroundColor:'white'});
win.add(currView);
var view1 = Ti.UI.createView({height:200,width:200,backgroundColor:'black'});
var view2 = Ti.UI.createView({height:200,width:200,backgroundColor:'red'});
var buttons = [{label:'ButtonOne',view:view1},{label:'ButtonTwo',view:view2}];
var btnBar = mcd.ui.createButtonBar(buttons,currView,1);
win.add(btnBar);
win.open();
