(() => {
    var mod = angular.module('qlearn.dd', []);

    mod.controller('qlearndd', ['$scope', ($scope) => {

        $scope.words = [ 'hello' ];

        $scope.orderedWords = [];

        $scope.onDragComplete = (index) => {
            $scope.words.splice(index, 1);
        };

        $scope.onDropComplete = (data, event) => {
            console.log(data, event);
            $scope.orderedWords.push(data);
        }

    }]);

})();