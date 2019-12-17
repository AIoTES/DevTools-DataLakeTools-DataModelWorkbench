(function() {
    'use strict';

    var app =  angular
        .module('dataLakeToolApp', [
            'ngStorage',
            'ngResource',
            'ngCookies',
            'ngAria',
            'ngCacheBuster',
            'ngFileUpload',
            'ui.bootstrap',
            'ui.bootstrap.datetimepicker',
            'ui.router',
            'infinite-scroll',
             'ui.codemirror',
            'hljs',
            // simlife-needle-angularjs-add-module Simlife will add new module here
            'angular-loading-bar'
        ]);
    
    angular.element(document).ready(function ($http) {
    	
    	var urlRequest = new XMLHttpRequest();
    	var url = 'api/keyCloakConfig';
    	urlRequest.open('GET', url, false);
    	urlRequest.send(null);
    	if(urlRequest.status === 200) {
//    		console.log("Keycloak Config: " + JSON.stringify(urlRequest.response));
//    		$rootScope.keycloakConf = urlRequest.response;
    	}
    	
    	var keycloakConf = JSON.parse(urlRequest.response);
//	    var keycloak = new Keycloak('content/keycloak/keycloak.json');
    	
    	var keycloakConfig = new Object();
    	Object.keys(keycloakConf).forEach(function(key) {
    		
    		var value = keycloakConf[key];
    		
    		if(key == "secret") {
    			console.log(key + " is secret");
    			var credentials = new Object();
    			credentials[key] = value;
    			keycloakConfig['credentials'] = credentials;
    		} else {
    			key = key.replace(/_/g, "-");
        	    keycloakConfig[key] = value;
    		}
    		
//    	    console.log(key, value);
    		
    		
    	});
    	

    	
//    	console.log("Keycloak Config Variable: " + JSON.stringify(keycloakConfig));
    	
    	var keycloak = new Keycloak(keycloakConfig);
    	
	    keycloak.init({onLoad: 'login-required'}).success(function () {
	      console.log('User is now authenticated.');

	      app.factory('Identity', function () {
	        return new Identity(keycloak, true);
	      });

	      angular.bootstrap(document, ["dataLakeToolApp"]);
	    }).error(function () {
	      console.log("error in keyCloak integration.");
//	      window.location.reload();
	    });

	});
        
        
        
        app.config(['hljsServiceProvider',
            function (hljsServiceProvider) {
               hljsServiceProvider.setOptions({
                            // replace tab with 4 spaces
                            tabReplace: '    '
                          });
            }])
        .run(run);

    run.$inject = ['stateHandler'];

    function run(stateHandler) {
        stateHandler.initialize();
    }


//.config(['$routeProvider', 'exampleRoutes',
//function ($routeProvider,   exampleRoutes) {
//
//}

})();
