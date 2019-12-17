(function() {
    'use strict';
    angular
        .module('dataLakeToolApp')
        .factory('Model', Model);

    Model.$inject = ['$resource', 'DateUtils', '$rootScope', 'Identity', '$http'];
    
//    function getBaseURL(Apibaseurl) {
//    	var mdsAPI = JSON.parse(JSON.stringify(Apibaseurl.get()));
//    	console.log("MDS API: " + JSON.stringify(mdsAPI));
//    	console.log("Base URL: " + mdsAPI.id);
//    }

    function Model ($resource, DateUtils, $rootScope, Identity, $http) {
    	
    	//local
    	//var resourceUrl =  'api/models/:id';
        
    	var token = Identity.authc.token;
    	console.log("Identity: " + JSON.stringify(Identity) );
    	console.log("Auth: " + $http.defaults.headers.common.Authorization);
    	
    	$http.defaults.headers.common.Authorization = Identity.authc.token;
    	
    	console.log("Auth After: " + $http.defaults.headers.common.Authorization);
    	
    	// external service
    	
    	var api = 'models/:id';
    	
    	var urlRequest = new XMLHttpRequest();
//    	var url = 'http://localhost:20086/api_base_urls/mds';
    	var url = 'api/mds';
    	urlRequest.open('GET', url, false);
    	urlRequest.send(null);
    	if(urlRequest.status === 200) {
    		console.log(JSON.stringify("MDS URL: " + urlRequest.response));
    		$rootScope.mdsURL = urlRequest.response;
    	}
    	
    	
    	var resourceUrl;    	
    	resourceUrl =  $rootScope.mdsURL + api;
    	
//    	resourceUrl =  'http://localhost:8081/api/models/:id';
    	
        return $resource(resourceUrl, {}, {
            'query': { 
            	method: 'GET',
            	headers: {
                    'Authorization': 'Bearer ' + Identity.authc.token
                },
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
                headers: {
                    'Authorization': 'Bearer ' + Identity.authc.token
                },
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
            'delete': { 
            	method:'DELETE',
            	headers: {
                    'Authorization': 'Bearer ' + Identity.authc.token
                }
            },
            'update': { 
            	method:'PUT',
            	headers: {
                    'Authorization': 'Bearer ' + Identity.authc.token
                },
            	transformResponse: function (data) {
                    if (data) {
                    	data = angular.fromJson(JSON.parse(data));
//                    	console.log("Update Response: " + JSON.stringify(data));
                    }
                    return data;
                }
            },
            'save': { 
            	method:'POST',
            	headers: {
                    'Authorization': 'Bearer ' + Identity.authc.token
                }
            }
        });
    }
})();
