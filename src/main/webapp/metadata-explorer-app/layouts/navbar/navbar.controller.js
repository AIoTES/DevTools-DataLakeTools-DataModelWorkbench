(function() {
    'use strict';

    angular
        .module('dataLakeToolApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$state', 'Auth', 'Principal', 'ProfileService', 'LoginService','Model','Deploy', '$rootScope', 'Identity', '$scope'];

    function NavbarController ($state, Auth, Principal, ProfileService, LoginService,Model,Deploy, $rootScope, Identity, $scope) {
        var vm = this;
        
        console.log('NavbarController');
        vm.isNavbarCollapsed = true;
        vm.databases = [];
        vm.isAuthenticated = Principal.isAuthenticated;

        ProfileService.getProfileInfo().then(function(response) {
            vm.inProduction = response.inProduction;
            vm.swaggerEnabled = response.swaggerEnabled;
        });

        vm.login = login;
        vm.logout = logout;
        vm.toggleNavbar = toggleNavbar;
        vm.collapseNavbar = collapseNavbar;
        vm.$state = $state;

        function login() {
//            collapseNavbar();
//            LoginService.open();
        }

        function logout() {
            collapseNavbar();
            Auth.logout();
            $state.go('home');
        }

        function toggleNavbar() {
            vm.isNavbarCollapsed = !vm.isNavbarCollapsed;
        }

        function collapseNavbar() {
            vm.isNavbarCollapsed = true;
        }
        
        $scope.logout = function() {
//        	alert("Logging out ..");
            Identity.logout();
        }

         
         
         $rootScope.$on('dataLakeToolApp:modelUpdateEvent', function(event) {
        	 loadAllModels();  
         });
         
         
         loadAllModels();

         function loadAllModels () {

                 Model.query({
                     page: 0,
                     size: 20,
                     sort: sort()
                 }, onSuccess, onError);

             function sort() {
                 var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
                 if (vm.predicate !== 'id') {
                     result.push('id');
                 }
                 return result;
             }
             function onSuccess(data, headers) {

                 vm.totalItems = headers('X-Total-Count');
                 vm.queryCount = vm.totalItems;
                 vm.models = data;
             }
             function onError(error) {
                 AlertService.error(error.data.message);
             }
         }
         
         
         $rootScope.$on('dataLakeToolApp:deployUpdateEvent', function(event) {
        	 loadAllDeployments();
         });
         
         loadAllDeployments();

         function loadAllDeployments () {

                 Deploy.query({
                     page: 0,
                     size: 20,
                     sort: sort()
                 }, onSuccess, onError);

             function sort() {
                 var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
                 if (vm.predicate !== 'id') {
                     result.push('id');
                 }
                 return result;
             }
             function onSuccess(data, headers) {

                 vm.totalItems = headers('X-Total-Count');
                 vm.queryCount = vm.totalItems;
                 vm.deploys = data;
             }
             function onError(error) {
                 AlertService.error(error.data.message);
             }
         }



    }
})();
