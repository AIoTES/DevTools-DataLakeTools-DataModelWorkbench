(function() {
    'use strict';
    angular
        .module('dataLakeToolApp')
        .factory('Model', Model);

    Model.$inject = ['$resource', 'DateUtils', '$rootScope'];

    function Model ($resource, DateUtils, $rootScope) {
        
    	var urlRequest = new XMLHttpRequest();
//    	var url = 'http://localhost:20086/api_base_urls/mds';
    	var url = 'api/mds';
    	urlRequest.open('GET', url, false);
    	urlRequest.send(null);
    	if(urlRequest.status === 200) {
    		console.log(JSON.stringify("MDS URL: " + urlRequest.response));
    		$rootScope.mdsURL = urlRequest.response;
    	}
    	
    	var api = 'api/devices/:id';
    	var resourceUrl = $rootScope.mdsURL + api;
    	
//    	var resourceUrl =  'http://localhost:8081/api/devices/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                    	console.log("Data: " + JSON.stringify(data));
                        data = angular.fromJson(JSON.parse(data));
                        data.created = DateUtils.convertDateTimeFromServer(data.created);
                        data.updated = DateUtils.convertDateTimeFromServer(data.updated);
                    }
                    return data;
                }
            },
            'update': { 
            	method:'PUT',
            	transformResponse: function (data) {
                    if (data) {
                    	data = angular.fromJson(JSON.parse(data));
                    	console.log("Update Response: " + JSON.stringify(data));
                    }
                    return data;
                }
            	}
           // 'save': { 
          //  	method:'POST', 
           // 	transformResponse: function (data) {
           // 		return data;
           // 	}
           // 	}
        });
    }
})();
