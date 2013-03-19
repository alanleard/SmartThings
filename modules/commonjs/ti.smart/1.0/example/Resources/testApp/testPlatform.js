Ti.include('lib/core/platform/platform.js');

alert(	
"deviceID:"+mcd.platform.deviceID +"\n"+
"Language:"+mcd.platform.lang+"\n"+
"Name:"+mcd.platform.name +"\n"+
"orientation:"+mcd.platform.orientation+"\n"+
"Resolution:"+mcd.platform.res+"\n"+
"RootDirectory:"+mcd.platform.rootDirectory+"\n"+
"Scallingfctors:"+mcd.platform.scalingFactors+"\n"+
"Size height:"+mcd.platform.size.height+"\n"+
"Size width:"+mcd.platform.size.width+"\n"+
"Version:"+mcd.platform.version+"\n"
);
