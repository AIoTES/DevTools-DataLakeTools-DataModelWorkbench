(function() {
    'use strict';
    angular
        .module('dataLakeToolApp')
        .factory('Deploy', Deploy);

    Deploy.$inject = ['$resource', 'DateUtils', '$rootScope'];

    function Deploy ($resource, DateUtils, $rootScope) {
        
    	
    	var urlRequest = new XMLHttpRequest();
    	var url = 'http://localhost:20086/api_base_urls/mds';
    	urlRequest.open('GET', url, false);
    	urlRequest.send(null);
    	if(urlRequest.status === 200) {
    		var resp = JSON.parse(urlRequest.response);
    		$rootScope.mdsURL = resp.baseurl;
    	}
    	
    	var api = 'api/deployments/:id';
    	var resourceUrl = $rootScope.mdsURL + api;
    	
//    	var resourceUrl =  'http://localhost:8081/api/deployments/:id';

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
