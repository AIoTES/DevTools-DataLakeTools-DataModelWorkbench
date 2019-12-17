(function() {
    'use strict';
    angular
        .module('dataLakeToolApp')
        .factory('Database', Database);

    Database.$inject = ['$resource', '$stateParams', '$location', '$rootScope', 'Identity'];

    function Database ($resource, $stateParams, $location, $rootScope, Identity) {
    	
    	//local
        
//    	var resourceUrl =  'api/databases/:id';
//        
//        return $resource(resourceUrl, {}, {
//            'query': { method: 'GET', isArray: true,
//            	transformResponse: function (data) {
//                    if (data) {
//                    	console.log("QUERY Data: " + JSON.stringify(data));
//                        data = angular.fromJson(data);
//                    }
//                    return data;
//                }
//            },
//            'get': {
//                method: 'GET',
//                transformResponse: function (data) {
//                    if (data) {
//                    	console.log("GET Data: " + JSON.stringify(data));
//                        data = angular.fromJson(data);
//                    }
//                    return data;
//                }
//            },
//            'update': { method:'PUT' }
//        });
        
        
        // external service
    	var token = Identity.authc.token;
    	console.log("Identity: " + JSON.stringify(Identity) );
    	var urlRequest = new XMLHttpRequest();
//    	var url = 'http://localhost:20086/api_base_urls/ids';
    	var url = 'api/ids';
    	urlRequest.open('GET', url, false);
    	urlRequest.send(null);
    	if(urlRequest.status === 200) {
    		console.log(JSON.stringify("IDS URL: " + urlRequest.response));
    		$rootScope.idsURL = urlRequest.response;
    	}
    	
    	var api = 'independentStorage/databases/:id';
    	var deleteApi = 'independentStorage/deleteDB';
    	var saveApi = 'independentStorage/createDB';
    	
    	var resourceUrl;    	
    	resourceUrl =  $rootScope.idsURL + api;
    	
    	var deleteUrl = $rootScope.idsURL + deleteApi;
    	var saveUrl = $rootScope.idsURL + saveApi;
        
//      var resourceUrl = 'http://localhost:4567/independentStorage/databases/:id';
//      var deleteUrl = 'http://localhost:4567/independentStorage/deleteDB';
//      var saveUrl = 'http://localhost:4567/independentStorage/createDB';

        var currentDB;
        
        return $resource(resourceUrl, {}, {
            'query': { 
            	method: 'POST', 
            	isArray: true,
            	headers: {
                    'Authorization': 'Bearer ' + token
                },
            	transformResponse: function (data) {
                    if (data) {
                    	//console.log("QUERY Data: " + JSON.stringify(data));
                    	
                    	var newJson = [];
                    	var databaseList = JSON.parse(data).databases;
                    	var i = 0;
                    	databaseList.forEach(function(value) {
                    		if(value !== '_internal') {
//                    			console.log("DB: " + value);
                    			var database = new Object();
                    			database.id=value;
                    			database.db=value;
                    			newJson[i] = database;
                    			i++;
                    		}
                    		});
                    	
                    	//console.log("QUERY Modified JSON: " + JSON.stringify(newJson));
                        
                    	newJson = angular.fromJson(newJson);
                    }
                    return newJson;
                }
            },
            'get': {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                transformRequest: {
                    body: function(data) {
                    	data = angular.fromJson(data);
                    	//console.log("GET Data Request: " + JSON.stringify(data));
                    	currentDB = data.id;
                    	return JSON.stringify(data);
                    }
            	},
                transformResponse: function (data) {
                    if (data) {
                    	//console.log("GET Data: " + JSON.stringify(data));
                    	
//                    	var currentDB = $stateParams.id;
                    	
                    	var newJson = [];
                    	var databaseList = JSON.parse(data).databases;
                    	//console.log("Current DB: " + currentDB);
                    	databaseList.forEach(function(value) {
                    		if(value !== '_internal' && value == currentDB) {
//                    			console.log("DB: " + value);
                    			var database = new Object();
                    			database.id=value;
                    			database.db=value;
                    			newJson = database;
                    			
                    		}
                    		});
                    	
                    	//console.log("GET Modified JSON: " + JSON.stringify(newJson));
                    	
                    	newJson = angular.fromJson(newJson);
                    }
                    return newJson;
                }
            },
            'update': { 
            	method:'PUT',
            	headers: {
                    'Authorization': 'Bearer ' + token
                }
            	
            },
            'delete': { 
            	method:'DELETE',
            	hasBody: 'true',
            	headers: {
                    'Authorization': 'Bearer ' + token
                },
            	url: deleteUrl,
            	transformRequest: {
                    function(data) {
//                    	console.log("DELETE Data: " + JSON.stringify(data));
                    	
                    	data = "{ db: '"+ $stateParams.id + "' }";
//                    	data = angular.fromJson(data);
//                    	console.log("DELETE Data Modified: " + JSON.stringify(data));
//                    	var newData = JSON.parse(data);
                    	//delete data["id"];
                    	//console.log("SAVE Modified Data: " + JSON.stringify(data));
                    	//data = angular.fromJson(data);
                    	return data;
                    }
            	}
            },
            'save': { 
            	method:'POST',
            	url: saveUrl,
            	headers: {
                    'Authorization': 'Bearer ' + token
                },
            	transformRequest: {
                    body: function(data) {
                    	//console.log("Save Data: " + JSON.stringify(data));
                    	//var newData = JSON.parse(data);
                    	delete data["id"];
//                    	console.log("SAVE Modified Data: " + JSON.stringify(data));
                    	data = angular.fromJson(data);
                    	return JSON.stringify(data);
                    }
            	}
            }
        });
        
        
    }
})();
