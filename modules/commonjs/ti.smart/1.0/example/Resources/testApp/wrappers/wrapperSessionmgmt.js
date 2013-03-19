(function() {
	mcd.test.session = {};
	mcd.test.session.testGetCookie=function(name,expectedOutput,flag){
		var webView = mcd.ui.createWebView('http://www.google.com',10,'');
		win1 = Ti.UI.createWindow();
	
		win1.add(webView);
		win1.open();
		var result=false;
		
	    function show(){
	    setTimeout(function(){
	   	var string;
	   	var cookie = mcd.sessionmgmt.getCookie(webView,name);
	    var detail='';	
	    var error='';
	    
	    var initResult=!(isUndefined(cookie));
	    if(Ti.Network.online&&initResult) {
		    result=initResult;
		    error='Expected: Cookie value is='+expectedOutput+' \nActual: Cookie value is='+cookie+' \n';
		    detail='';
		    string='<?xml version="1.0" encoding="UTF-8"?>\n<method>\n'+'<name>sessionmgmt.getCookie</name>\n'+'<pass>'+result+'</pass>\n<detail>'+error+detail+'</detail>\n'+'</method>\n';
		
		}
		else if(Ti.Network.online&&!(initResult)){
			result=initResult;
			error='Expected: Cookie value is='+expectedOutput+' \nActual: Cookie value is='+cookie+' \n';
			detail='Framework error';
			string='<?xml version="1.0" encoding="UTF-8"?>\n<method>\n'+'<name>sessionmgmt.getCookie</name>\n'+'<pass>'+result+'</pass>\n<detail>'+error+detail+'</detail>\n'+'</method>\n';
		
		}
		else{
			result=false;
			error='Expected: Cookie value is='+expectedOutput+' \nActual: Cookie value is='+cookie+' \n';
			detail='No network';
			string='<?xml version="1.0" encoding="UTF-8"?>\n<method>\n'+'<name>sessionmgmt.getCookie</name>\n'+'<pass>'+'scope'+'</pass>\n<detail>'+error+detail+'</detail>\n'+'</method>\n';
		}
		if(flag===1){
			var alertString=result?'Passed':'Failed \n'+error+detail;
			alert(alertString);
		}
		else
			writeMethodFile('GetCookie.xml',string);
			win1.remove(webView);
			
			
			
			webView.removeEventListener('load',show);
	    win1.close();
	    },5000);
	   }
	   webView.addEventListener('load',show);
	   	

	}
	mcd.test.session.testRemoveAllCookies=function(expectedOutput,flag){
	 	var webView2 = mcd.ui.createWebView('http://www.google.com',10,'');
	 	win2 = Ti.UI.createWindow();
	
		win2.add(webView2);
		win2.open();
		var result2=false;
	 	
	 	function remove(){
	 		mcd.sessionmgmt.removeAllCookies();
	 		var cookie2 = mcd.sessionmgmt.getCookie(webView2,'PREF');
	 		var detail='';
	 		var error='';
	 		
	 		var initResult2=isUndefined(cookie2);
		    if(Ti.Network.online&&initResult2) {
			    result2=initResult2;
			    error='Expected: Value of PREF cookie after removing all cookies='+expectedOutput+' \nActual: Value of PREF cookie after removing all cookies'+cookie2+' \n';
			    detail='';
			    string='<?xml version="1.0" encoding="UTF-8"?>\n<method>\n'+'<name>sessionmgmt.removeAllCookies</name>\n'+'<pass>'+result2+'</pass>\n<detail>'+error+detail+'</detail>\n'+'</method>\n';
				
			}
			else if(Ti.Network.online&&!(initResult2)){
				result2=initResult2;
				error='Expected: Value of PREF cookie after removing all cookies='+expectedOutput+' \nActual: Value of PREF cookie after removing all cookies'+cookie2+' \n';
				detail='Framework error';
				string='<?xml version="1.0" encoding="UTF-8"?>\n<method>\n'+'<name>sessionmgmt.removeAllCookies</name>\n'+'<pass>'+result2+'</pass>\n<detail>'+error+detail+'</detail>\n'+'</method>\n';
			
			}
			else{
				result2=false;
				error='Expected: Value of PREF cookie after removing all cookies='+expectedOutput+' \nActual: Value of PREF cookie after removing all cookies'+cookie2+' \n';
				detail='No network';
				string='<?xml version="1.0" encoding="UTF-8"?>\n<method>\n'+'<name>sessionmgmt.removeAllCookies</name>\n'+'<pass>'+'scope'+'</pass>\n<detail>'+error+detail+'</detail>\n'+'</method>\n';
			}
		 		
		 	if(flag===1){
				var alertString=result2?'Passed':'Failed \n'+error+detail;
				alert(alertString);
			}
			else
				writeMethodFile('RemoveAllCookies.xml',string);
				webView2.removeEventListener('load',remove);
				win2.close();
		 	}
		 webView2.addEventListener('load',remove);
	 		
	
	 }   
 })();