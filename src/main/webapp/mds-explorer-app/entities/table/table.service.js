(function() {
    'use strict';
    angular
        .module('dataLakeToolApp')
        .factory('Table', Table);

    Table.$inject = ['$resource', '$state', '$stateParams', '$rootScope', 'Identity'];

    function Table ($resource, $state, $stateParams, $rootScope, Identity) {
        
    	// Local Calls
//    	var resourceUrl =  'api/tables/:id';
//    	
//    	return $resource(resourceUrl, {}, {
//            'query': { 
//            	method: 'GET', 
//            	isArray: true,
//            	transformResponse: function (data) {
//                  if (data) {
//                  	console.log("Tables QUERY Data: " + JSON.stringify(data));
//                      data = angular.fromJson(data);
//                  }
//                  return data;
//                  
//            	}
//            },
//            'get': {
//                method: 'GET',
//                transformResponse: function (data) {
//                    if (data) {
//                    	console.log("Table Get Data: " + JSON.stringify(data));
//                        data = angular.fromJson(data);
//                    }
//                    return data;
//                }
//            },
//            'update': { method:'PUT' }
//        });

    	
    	// External Calls
    	
    	var token = Identity.authc.token;
    	console.log("Identity: " + JSON.stringify(Identity) );
    	
    	var api = 'independentStorage/tables/:id';
    	var getApi = 'independentStorage/select';
    	var updateApi = 'independentStorage/update';
    	var deleteApi = 'independentStorage/delete';
    	var insertApi = 'independentStorage/insert';
    	
    	var resourceUrl =  $rootScope.idsURL + api;
    	var getUrl = $rootScope.idsURL + getApi;
    	var updateUrl = $rootScope.idsURL + updateApi;
    	var deleteUrl = $rootScope.idsURL + deleteApi;
    	var insertUrl = $rootScope.idsURL + insertApi;
    	
//    	var resourceUrl =  'http://localhost:4567/independentStorage/tables/:id';
//    	var getUrl = 'http://localhost:4567/independentStorage/select';
//    	var updateUrl = 'http://localhost:4567/independentStorage/update';
//    	var deleteUrl = 'http://localhost:4567/independentStorage/delete';
//    	var insertUrl = 'http://localhost:4567/independentStorage/insert';
    	
    	
    	
    	var tableID;
    	var dbID;
    	
        return $resource(resourceUrl, {}, {
            'query': { 
            	method: 'POST', 
            	isArray: true,
            	headers: {
                    'Authorization': 'Bearer ' + token
                },
            	transformRequest: {
                    body: function(data) {
                    	data = angular.fromJson(data);
                    	//console.log("Query Table Request: " + JSON.stringify(data));
                    	return JSON.stringify(data);
                    }
            	},
            	transformResponse: function (data) {
                    if (data) {
                    	//console.log("Tables QUERY Data: " + JSON.stringify(data));
                    	var newJson = [];
                    	if(JSON.stringify(data) !== "\"{}\"") {
                    		//console.log("Table List is not empty ");
                        	
                        	var tableList = JSON.parse(data).tables;
                        	var i = 0;
                        	tableList.forEach(function(value) {
                        		//console.log("Table: " + value);
                        		var table = new Object();
                        		table.id=value;
                        		table.table=value;
                        		table.db=$state.params.db;
                        		table.data="some data";
                        		table.query=null;
                        		newJson[i] = table;
                        		i++;
                        		});
                    	}
                    	
                    	//console.log("Table QUERY Modified JSON: " + JSON.stringify(newJson));
                        //console.log("Service DB: " + $state.params.db);
                    	newJson = angular.fromJson(newJson);
                    }
                    
                    return newJson;
                }
            },
            'get': {
                method: 'POST',
                //isArray: true,
                url: getUrl,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                transformRequest: {
                    body: function(data) {
                    	data = angular.fromJson(data);
//                    	console.log("GET Table Request: " + JSON.stringify(data));
                    	data.db = data.db;
                    	dbID = data.db;
                    	data.table = data.id;
                    	tableID = data.id;
                    	if(!data.query) {
                    		data.query = "SELECT * from " + data.table;
                    	} 
                    	//delete data["id"];
//                    	console.log("GET Table Request Modified: " + JSON.stringify(data));
                    	return JSON.stringify(data);
                    }
            	},
                transformResponse: function (data) {
                    if (data) {
                    	
                    	data = JSON.parse(data)[0];
                    	
                    	//console.log("Tables GET Response: " + JSON.stringify(data));
                    	                    	
                    	var tableData = new Object();
                    	tableData.id = tableID;
                    	tableData.db = dbID;
                    	tableData.table = tableID;
                    	tableData.data = JSON.stringify(data);
                    	
                    	//newJson[0] = tableData;
                    	
                    	//console.log("Table GET Modified Data: " + JSON.stringify(tableData));
                    	
                    	tableData = angular.fromJson(tableData);
                    }
                    return tableData;
                }
            },
            'update': { 
            	method:'POST',
            	url: updateUrl,
            	headers: {
                    'Authorization': 'Bearer ' + token
                },
            	transformRequest: {
                    body: function(data) {
                    	//console.log("UPDATE Data REQUEST: " + JSON.stringify(data));
                    	data = angular.fromJson(data);
                    	data.query = "SELECT * from " + data.table;
                    	delete data["id"];
                    	//console.log("UPDATE Data REQUEST Modified: " + JSON.stringify(data));
                    	return JSON.stringify(data);
                    }
            	}
            },
            'delete': { 
            	method:'DELETE',
            	hasBody: 'true',
            	url: deleteUrl,
            	headers: {
                    'Authorization': 'Bearer ' + token
                },
            	transformRequest: {
                    function(data) {
//                    	console.log("DELETE Data: " + JSON.stringify(data));
//                    	console.log("table: " + $stateParams.id);
//                    	console.log("db: " + $state.params.db);
                    	var table = $stateParams.id;
                    	data = "{ db: '"+ $state.params.db + "', table: '"+ table +"', query: 'DELETE FROM " + table + "' }";
//                    	data = angular.fromJson(data);
                    	console.log("DELETE Data Modified: " + JSON.stringify(data));
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
            	url: insertUrl,
            	headers: {
                    'Authorization': 'Bearer ' + token
                },
            	transformRequest: {
                    body: function(data) {
                    	//console.log("Save Data: " + JSON.stringify(data));
                    	data = angular.fromJson(data);
                    	return JSON.stringify(data);
                    }
            	}
            }
        });
        
        
        
    }
})();
