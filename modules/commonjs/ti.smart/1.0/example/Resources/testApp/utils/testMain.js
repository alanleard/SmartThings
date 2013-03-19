function createTestApp() {
	mcd.test = {}
	Ti.include('/testApp/utils/properties.js');
	Ti.include('/testApp/utils/testSave.js');
	Ti.include('/testApp/utils/assertions.js');
	Ti.include('/testApp/wrappers/wrapperUtils.js');
	Ti.include('/testApp/wrappers/wrapperFile.js');
	Ti.include('/testApp/wrappers/wrapperDB.js');
	Ti.include('/testApp/wrappers/wrapperSecurity.js');
	Ti.include('/testApp/wrappers/wrapperSessionmgmt.js');
	Ti.include('/testApp/wrappers/wrapperLocation.js');
	Ti.include('/testApp/wrappers/wrapperNetwork.js');
	Ti.include('/testApp/wrappers/wrapperGetRestaurant.js');
	Ti.include('/testApp/wrappers/wrapperCaching.js');

	var count = 0;
	var totalPass = 0;
	var totalFail = 0;
	var scope = 0;
	var bt1 = Titanium.UI.createButton({
		top : mcd.utils.scale(100, 'v'),
		left : mcd.utils.scale(50, 'h'),
		height : mcd.utils.scale(50, 'v'),
		width : mcd.utils.scale(220, 'h'),
		title : 'Test All Functions'
	});

	var bt2 = Titanium.UI.createButton({
		top : mcd.utils.scale(170, 'v'),
		left : mcd.utils.scale(50, 'h'),
		width : mcd.utils.scale(220, 'h'),
		height : mcd.utils.scale(50, 'v'),
		title : 'Test A Single Function'
	});
	bt2.addEventListener('click', function() {
		var methodFile = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'testApp/utils/methods.xml');
		var results = methodFile.read().text;
		var doc = Ti.XML.parseString(results);
		// Give me a xml document.
		var lib = doc.documentElement.getElementsByTagName("library");
		var params = doc.documentElement.getElementsByTagName("method");
		var methodsArray = [];
		for( j = 0; j < lib.length; j++) {
			var libName = lib.item(j).getElementsByTagName("title").item(0).text;
			var details = lib.item(j).getElementsByTagName("details");
			methodsArray.push({
				title : libName,
				backgroundColor : '#FFDA91',
				color : 'black'
			});
			var methods = details.item(0).getElementsByTagName("method");
			for( i = 0; i < methods.length; i++) {

				var name = methods.item(i).getElementsByTagName("name");
				var status = methods.item(i).getElementsByTagName("code").item(0).text;
				methodsArray.push({
					title : name.item(0).text,
					app : status,
					backgroundColor : '#FFF6E4',
					color : 'black'
				});

			};
		};
		var table = Titanium.UI.createTableView({
			data : methodsArray,
			top : 5
		});
		table.addEventListener('click', function(e) {

			if(e.rowData.app) {
				var fn = new Function("term", "return " + e.rowData.app + ";");
				fn();
			}
		});
		var singleUi = [];
		singleUi = [table];
		var singleWin = mcd.ui.constructWindow('McD Functions', 'singletab', singleUi);

		singleWin.open();
	});
	function detailedResults() {
		var files = ['CleanTelNumber', 'IsBoolean', 'IsNull', 'IsNumber', 'IsString', 'IsValidEmail', 'IsValidUSZipCode', 'IsValidWebAddress', 'Scale', 'Get', 'Put', 'ExecuteSql', 'ExecuteSqlWithReturn', 'DeleteDB', 'CheckFileExistence', 'WriteToFile', 'AppendToFile', 'ReadFromFile', 'CheckAvailableSpace', 'EncryptStr', 'DecryptStr', 'SetString', 'GetString', 'SetPurpose', 'CreateAnnotation', 'GetAddress', 'GetPosition', 'CheckNetworkConnection', 'GetNetworkType', 'CreateAnnotations', 'LocateUser', 'Init', 'LoadLookup', 'PutJSONObject', 'GetJSONObject', 'DeleteJSONObject', 'GetResourceID', 'GetCacheableResource', 'DeleteFromCache', 'IsOK', 'TimerStart', 'TimerCheckpoint', 'Notify', 'GetCookie', 'RemoveAllCookies'];

		var testResult = [];
		var row = Titanium.UI.createTableViewRow({
			height : 50,
			widht : 320,
			backgroundColor : '#FFDA91'
		});
		var nameLab = Titanium.UI.createLabel({
			height : 50,
			left : 10,
			width : 300,
			color : 'black',
			text : 'Function Name',
			backgroundColor : '#FFDA91'
		});
		var statusLab = Titanium.UI.createLabel({
			height : 50,
			left : 270,
			width : 'auto',
			color : 'black',
			text : 'Result',
			backgroundColor : '#FFDA91'
		});
		row.add(nameLab);
		row.add(statusLab);
		testResult.push(row);

		for(var i = 0; i < files.length; i++) {
			var tempFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, files[i] + '.xml');
			if(tempFile.exists()) {

				var results = readMethodFile(files[i]);

				var doc = Ti.XML.parseString(results);

				var name = doc.documentElement.getElementsByTagName('name').item(0).text;
				var status = doc.documentElement.getElementsByTagName('pass').item(0).text;
				var detail = doc.documentElement.getElementsByTagName('detail').item(0).text;

				if(status === 'true') {
					testResult.push({
						title : name,
						rightImage : '/testApp/theme/bullet_green.png',
						backgroundColor : '#FFF6E4',
						color : 'black',
						status : 'pass',
						detail : ''
					});
				} else if(status === 'scope') {
					testResult.push({
						title : name,
						rightImage : '/testApp/theme/bullet_yellow.png',
						backgroundColor : '#FFF6E4',
						color : 'black',
						status : 'scope',
						detail : detail
					});
				} else {
					testResult.push({
						title : name,
						rightImage : '/testApp/theme/bullet_red.png',
						backgroundColor : '#FFF6E4',
						color : 'black',
						status : 'fail',
						detail : detail
					});
				}
			}
		}
		var table = Titanium.UI.createTableView({
			data : testResult,
			top : 5
		});
		table.addEventListener('click', function(e) {

			if((e.rowData.status === 'fail') || (e.rowData.status === 'scope')) {
				if(e.rowData.detail)
					alert(e.rowData.detail);
				
else
					alert('Unable to locate cause of failure');
			}
		});

		var ui = [];
		ui = [table]
		var detailWin = mcd.ui.constructWindow('Detailed Results', 'singletab', ui);

		detailWin.open();

	}

	var bt3 = Titanium.UI.createButton({
		top : mcd.utils.scale(240, 'v'),
		left : mcd.utils.scale(50, 'h'),
		width : mcd.utils.scale(220, 'h'),
		height : mcd.utils.scale(50, 'v'),
		title : 'View Results Summary'
	});
	var bt4 = Titanium.UI.createButton({
		top : mcd.utils.scale(310, 'v'),
		left : mcd.utils.scale(50, 'h'),
		width : mcd.utils.scale(220, 'h'),
		height : mcd.utils.scale(50, 'v'),
		title : 'View Results in Detail'
	});
	bt4.addEventListener('click', function() {

		detailedResults();

	});

	function calculateSummary() {

		var label1 = Titanium.UI.createLabel({
			text : 'Number of Functions Passed :',
			font : {
				fontSize : 11
			},
			top : mcd.utils.scale(5, 'v'),
			left : mcd.utils.scale(5, 'h'),
			color : 'black'
		});

		var label2 = Titanium.UI.createLabel({
			text : 'Number of Functions Failed :',
			font : {
				fontSize : 11
			},
			top : mcd.utils.scale(60, 'v'),
			left : mcd.utils.scale(5, 'h'),
			color : 'black'
		});
		var labelScope = Titanium.UI.createLabel({
			text : 'Number of Failures Due to External Errors :',
			font : {
				fontSize : 11
			},
			top : mcd.utils.scale(115, 'v'),
			left : mcd.utils.scale(5, 'h'),
			color : 'black'
		});
		var total = totalPass + totalFail + scope;
		var label3 = Titanium.UI.createLabel({
			text : 'Total Number of Functions Tested :',
			font : {
				fontSize : 11
			},
			top : mcd.utils.scale(170, 'v'),
			left : mcd.utils.scale(5, 'h'),
			color : 'black'
		});
		var val1 = Titanium.UI.createLabel({
			text : totalPass,
			font : {
				fontSize : 11
			},
			top : mcd.utils.scale(5, 'v'),
			left : mcd.utils.scale(220, 'h'),
			color : 'black'
		});
		var val2 = Titanium.UI.createLabel({
			text : totalFail,
			font : {
				fontSize : 11
			},
			top : mcd.utils.scale(60, 'v'),
			left : mcd.utils.scale(220, 'h'),
			color : 'black'
		});
		var valScope = Titanium.UI.createLabel({
			text : scope,
			font : {
				fontSize : 11
			},
			top : mcd.utils.scale(115, 'v'),
			left : mcd.utils.scale(220, 'h'),
			color : 'black'
		});
		var val3 = Titanium.UI.createLabel({
			text : total,
			font : {
				fontSize : 11
			},
			top : mcd.utils.scale(170, 'v'),
			left : mcd.utils.scale(220, 'h'),
			color : 'black'
		});
		var holderView = mcd.ui.createView(100, 40, 230, 240, '', '', '');
		holderView.add(label1);
		holderView.add(label2);
		holderView.add(labelScope);
		holderView.add(label3);
		holderView.add(val1);
		holderView.add(val2);
		holderView.add(valScope);
		holderView.add(val3);

		var summaryUi = [];
		summaryUi = [holderView];
		var summaryWin = mcd.ui.constructWindow('Result Summary', 'singletab', summaryUi);

		summaryWin.open();

	};
	bt3.addEventListener('click', function() {
		totalPass = 0;
		totalFail = 0;
		scope = 0;

		var files = ['CleanTelNumber', 'IsBoolean', 'IsNull', 'IsNumber', 'IsString', 'IsValidEmail', 'IsValidUSZipCode', 'IsValidWebAddress', 'Scale', 'Get', 'Put', 'ExecuteSql', 'ExecuteSqlWithReturn', 'DeleteDB', 'CheckFileExistence', 'WriteToFile', 'AppendToFile', 'ReadFromFile', 'CheckAvailableSpace', 'EncryptStr', 'DecryptStr', 'SetString', 'GetString', 'SetPurpose', 'CreateAnnotation', 'GetAddress', 'GetPosition', 'CheckNetworkConnection', 'GetNetworkType', 'CreateAnnotations', 'LocateUser', 'Init', 'LoadLookup', 'PutJSONObject', 'GetJSONObject', 'DeleteJSONObject', 'GetResourceID', 'GetCacheableResource', 'DeleteFromCache', 'IsOK', 'TimerStart', 'TimerCheckpoint', 'Notify', 'GetCookie', 'RemoveAllCookies'];
		var testResult = [];

		for(var i = 0; i < files.length; i++) {
			var status = '0';
			var tempFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, files[i] + '.xml');
			if(tempFile.exists()) {

				var results = readMethodFile(files[i]);

				var doc = Ti.XML.parseString(results);

				var status = doc.documentElement.getElementsByTagName('pass').item(0).text;
			}
			if(status === 'true')
				totalPass++;
			if(status === 'false')
				totalFail++;
			if(status === 'scope')
				scope++;
		}

		calculateSummary();
	});

	var win = mcd.ui.constructWindow('Test Framework', 'singletab', '');
	win.add(bt1);
	win.add(bt2);
	bt1.addEventListener('click', function() {

		totalPass = 0;
		totalFail = 0;
		var indicator = mcd.ui.createMaskLoadingIndicator("Testing");
		if(Ti.Platform.osname === 'android') {
			indicator.show();
		} else if(Ti.Platform.osname === 'iphone') {
			if(win !== null) {
				win.add(indicator);
			}
		}

		Ti.include('/testApp/testUtils.js');
		Ti.include('/testApp/testDB.js');
		Ti.include('/testApp/testFile.js');

		Ti.include('/testApp/testSecurity.js');

		Ti.include('testApp/testLocation.js');
		Ti.include('/testApp/testConnectivity.js');
		Ti.include('testApp/testGetRestaurant.js');
		Ti.include('/testApp/testSessionmgmt.js');
		Ti.include('/testApp/testCaching.js');

		setTimeout(function() {
			indicator.hide();
			detailedResults();
			if(count === 0) {
				win.add(bt3);
				win.add(bt4);
				count = 1;
			}
		}, 15000);

	});
	win.open();

};

