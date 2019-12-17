(function() {
    'use strict';
    angular
        .module('dataLakeToolApp')
        .factory('Deploy', Deploy);

    Deploy.$inject = ['$resource', 'DateUtils', '$rootScope', 'Identity'];

    function Deploy ($resource, DateUtils, $rootScope, Identity) {
        
    	var token = Identity.authc.token;
    	console.log("Identity: " + JSON.stringify(Identity) );
    	
    	var urlRequest = new XMLHttpRequest();
//    	var url = 'http://localhost:20086/api_base_urls/mds';
    	var url = 'api/mds';
    	urlRequest.open('GET', url, false);
    	urlRequest.send(null);
    	if(urlRequest.status === 200) {
    		console.log(JSON.stringify("MDS URL: " + urlRequest.response));
    		$rootScope.mdsURL = urlRequest.response;
    	}
    	
    	var api = 'deployments/:id';
    	var resourceUrl = $rootScope.mdsURL + api;
    	
//    	var resourceUrl =  'http://localhost:8081/api/deployments/:id';

        return $resource(resourceUrl, {}, {
            'query': { 
            	method: 'GET', 
            	isArray: true,
            	headers: {
                    'Authorization': 'Bearer ' + token
                }
            	
            },
            'get': {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
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
                    'Authorization': 'Bearer ' + token
                }
            },
            'update': { 
            	method:'PUT',
            	headers: {
                    'Authorization': 'Bearer ' + token
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
                    'Authorization': 'Bearer ' + token
                },
                transformResponse: function (data) {
                    if (data) {
                    	data = angular.fromJson(JSON.parse(data));
//                    	console.log("SAVE Response: " + JSON.stringify(data));
                    }
                    return data;
                }
            }
        });
    }
})();
