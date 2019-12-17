(function() {
    'use strict';

    angular
        .module('dataLakeToolApp')
        .factory('LoginService', LoginService);

    LoginService.$inject = ['$uibModal'];

    function LoginService ($uibModal) {
        var service = {
            open: open
        };

        var modalInstance = null;
        var resetModal = function () {
            modalInstance = null;
        };

        return service;

        function open () {
            if (modalInstance !== null) return;
            modalInstance = $uibModal.open({
                animation: false,
                show: false,
                templateUrl: 'metadata-explorer-app/components/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            });
            modalInstance.$promise.then(modalInstance.hide);
            modalInstance.result.then(
                resetModal,
                resetModal
            );
        }
    }
})();
