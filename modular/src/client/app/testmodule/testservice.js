(function () {
    'use strict';

    angular
        .module('testmod')
        .factory('testservice', testservice);

    testservice.$inject = ['$http'];

    /* @ngInject */
    function testservice($http) {
        var service = {
            ping: ping
        };

        return service;

        ////////////////

        function ping() {
            return 'pong';
        }
    }
})();