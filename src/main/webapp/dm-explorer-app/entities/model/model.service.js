(function() {
    'use strict';
    angular
        .module('dataLakeToolApp')
        .factory('Model', Model);

    Model.$inject = ['$resource', 'DateUtils', '$rootScope'];
    
//    function getBaseURL(Apibaseurl) {
//    	var mdsAPI = JSON.parse(JSON.stringify(Apibaseurl.get()));
//    	console.log("MDS API: " + JSON.stringify(mdsAPI));
//    	console.log("Base URL: " + mdsAPI.id);
//    }

    function Model ($resource, DateUtils, $rootScope) {
    	
    	//local
    	//var resourceUrl =  'api/models/:id';
        
    	
    	// external service
    	
    	var api = 'api/models/:id';
    	
    	var urlRequest = new XMLHttpRequest();
    	var url = 'http://localhost:20086/api_base_urls/mds';
    	urlRequest.open('GET', url, false);
    	urlRequest.send(null);
    	if(urlRequest.status === 200) {
    		var resp = JSON.parse(urlRequest.response);
    		$rootScope.mdsURL = resp.baseurl;
    	}
    	
    	
    	var resourceUrl;    	
    	resourceUrl =  $rootScope.mdsURL + api;
    	
        return $resource(resourceUrl, {}, {
            'query': { 
            	method: 'GET',
            	transformResponse: function (data) {
                    if (data) {
//                    	console.log("Query Data Response: " + JSON.stringify(data));
                        data = angular.fromJson(JSON.parse(data));
                    }
                    return data;
                },
            	isArray: true
            },
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
//                    	console.log("Data: " + JSON.stringify(data));
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
//                    	console.log("Update Response: " + JSON.stringify(data));
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
