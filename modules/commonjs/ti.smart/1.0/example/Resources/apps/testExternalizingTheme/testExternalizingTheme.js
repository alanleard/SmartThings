var mcd = require('mcd.core');
( function() {

		Ti.include('/lib/core/externalizeTheme.js');
		
/*
 * Create a window with a image and a label
 */		
		var win1 = Titanium.UI.createWindow({
			title : 'ZipFile test',
			backgroundColor : '#fff'
		});

		var imgView = Ti.UI.createImageView({
			image : 'http://www.solutionexchange.info/files/virtusa_logo.png',
			top : 10
		});
		var label = Ti.UI.createLabel({
			text : 'Country Not Selected',
			bottom : 10
		})
		win1.add(imgView);
		win1.add(label);
		win1.open();
		
/*
 * Internal Function - Update image and label
 */
		function updateScreenWithRemoteData() {
			imgView.image = mcd.externalizeTheme.getResource('image.png');
			 var countryStr = mcd.L("country");
			 var addressStr = mcd.L("address");
			 label.text = "Country : " + countryStr +'\n'+ 'Address : '+addressStr;
			var orderingTheme = mcd.externalizeTheme.getThemeObject('ordering');
			win1.backgroundColor = orderingTheme.window.backgroundColor;
		}

		
		if(mcd.config.themeType === 'remote' && Ti.Network.online) {
/*
 * Loading Package Config
 */
			mcd.externalizeTheme.loadPackageConfig('packageConfigLoaded');

							var loadPackageConfigCallBack = function(e) {
				Ti.App.removeEventListener('packageConfigLoaded', loadPackageConfigCallBack);
				
				if(e.status === 'error'){
					Ti.API.info('[testExternalizingTheme] Failed to load package config');
					return;
				}
				//TODO selection
				
				// Mannual country selection - country list is defined on packageConfig
				var packageConfig = e.packageConfigObj;			
				var chooseMode = Titanium.UI.createAlertDialog({
					buttonNames : ['Choose Country','Auto-Geo Location'],
					title : 'Please Select Mode'
				})
				chooseMode.show();
				

				chooseMode.addEventListener('click', function(e) {
					if(e.index === 0) {
						
						var chooseCountry = Titanium.UI.createAlertDialog({
							buttonNames : packageConfig.countries,
							title : 'Please Select Country'
						})
						chooseCountry.show();
						chooseCountry.addEventListener('click', function(e) {
							var selectedCountry = packageConfig.countrycodes[e.index]

							mcd.externalizeTheme.isServerUpdated(selectedCountry, 'lastUpdatedDate');

						})
					} else {
						//Geo Location based tracking
						Ti.Geolocation.purpose = 'McD '
						Ti.Geolocation.getCurrentPosition(function(e) {
							Ti.Geolocation.reverseGeocoder(e.coords.latitude, e.coords.longitude, function(e) {
								if(e.places[0].country_code){
								var selectedCountry = e.places[0].country_code;
								var upperCaseSelectedCountry = selectedCountry.toUpperCase();
								mcd.externalizeTheme.isServerUpdated(upperCaseSelectedCountry, 'lastUpdatedDate');
								}
							})
						})
					}
				})	

				


	
				

			};

			Ti.App.addEventListener('packageConfigLoaded', loadPackageConfigCallBack);
			
/*
 * End of loading package config and selecting country
 */


/*
 * Get Last updated time of pre loaded resources
 */			


			var lastUpdateTime = function(e) {
				
				Ti.App.removeEventListener('lastUpdatedDate', lastUpdateTime);
				

				if(e.status === 'error') {
					Ti.API.info('[testExternalizingTheme] Failed to preload resuorce update time');
					return;
				}

				if(e.isUpdated === 1) {
					mcd.externalizeTheme.managePreloadDownloads('preloaded');
					Ti.API.info("--------Preload Resources Updated----------")
					
				} else {
					Ti.API.info("Theme Resource not updated")
					updateScreenWithRemoteData();
				}

				
			};
			
			
			Ti.App.addEventListener('lastUpdatedDate', lastUpdateTime);

/*
 * End of getting Last updated time of pre loaded resources
 */			
			
			var resourcesPreLoaded = function(e) {
				Ti.App.removeEventListener('preloaded', resourcesPreLoaded);

				if(e.status === 'error') {
					Ti.API.info('[testExternalizingTheme] Failed to load preload resources from server');
					return;
				}

				updateScreenWithRemoteData() 
			};

			Ti.App.addEventListener('preloaded', resourcesPreLoaded);

		} else {

			alert("Configuration is set to local theme");
			updateScreenWithRemoteData();
		}
		
	}())