(function() {
    'use strict';

    angular
        .module('dataLakeToolApp')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$rootScope', '$q', '$location', '$localStorage', '$sessionStorage', 'Identity'];

    function authInterceptor ($rootScope, $q, $location, $localStorage, $sessionStorage, Identity) {
        var service = {
            request: request
        };

        return service;

        function request (config) {
            if (!config || !config.url || /^http/.test(config.url)) return config;

            /*jshint camelcase: false */
            config.headers = config.headers || {};
            var token = $localStorage.authenticationToken || $sessionStorage.authenticationToken;
            if (token) {
            	var apiURL = config.url.split("?")[0];
            	if(apiURL === "api/account") {
            		config.headers.Authorization = 'Bearer ' + token;
            	} else {
            		config.headers.Authorization = 'Bearer ' + Identity.authc.token;
            	}
                
            }
            return config;
        }
    }
})();
