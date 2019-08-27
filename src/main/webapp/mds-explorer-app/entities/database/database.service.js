(function() {
    'use strict';
    angular
        .module('dataLakeToolApp')
        .factory('Database', Database);

    Database.$inject = ['$resource', '$stateParams'];

    function Database ($resource, $stateParams) {
    	
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
        
        var resourceUrl = 'http://localhost:4567/independentStorage/databases/:id';

        var currentDB;
        
        return $resource(resourceUrl, {}, {
            'query': { method: 'POST', isArray: true,
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
            	method:'PUT' 
            	
            },
            'delete': { 
            	method:'DELETE',
            	url: 'http://localhost:4567/independentStorage/deleteDB',
            	interceptor: function(config) {
            			console.log("DELETE Request: " + JSON.stringify(config));
            	},
            	transformRequest: {
                    body: function(data) {
                    	console.log("DELETE Data: " + JSON.stringify(data));
                    	//var newData = JSON.parse(data);
                    	//delete data["id"];
                    	//console.log("SAVE Modified Data: " + JSON.stringify(data));
                    	//data = angular.fromJson(data);
                    	return JSON.stringify(data);
                    },
                    headers: function(data) {
                    	
                    	//console.log("DELETE Headers: " + JSON.stringify(data));

                    }
            	}
            },
            'save': { 
            	method:'POST',
            	url: 'http://localhost:4567/independentStorage/createDB',
            	transformRequest: {
                    body: function(data) {
                    	//console.log("Save Data: " + JSON.stringify(data));
                    	//var newData = JSON.parse(data);
                    	delete data["id"];
                    	console.log("SAVE Modified Data: " + JSON.stringify(data));
                    	data = angular.fromJson(data);
                    	return JSON.stringify(data);
                    }
            	}
            }
        });
        
        
    }
})();
