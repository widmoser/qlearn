(() => {
    var mod = angular.module('qlearn.dd', []);

    mod.controller('qlearndd', ['$scope', ($scope) => {

        $scope.words = [ 'hello' ];

    }]);

})();