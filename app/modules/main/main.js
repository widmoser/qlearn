(() => {
    var mod = angular.module('qlearn.dd', []);

    mod.controller('qlearndd', ['$scope', ($scope) => {

        $scope.words = [ 'Hello', 'Name', 'Hannes!', 'my', 'is' ];

        $scope.orderedWords = [];

        $scope.onDragComplete = (index) => {
            $scope.words.splice(index, 1);
        };

        $scope.onDragCompleteOrdered = (index) => {
            $scope.orderedWords.splice(index, 1);
        };

        $scope.onDropComplete = (data, event) => {
            console.log(data, event);
            $scope.orderedWords.push({
                text: data,
                x: event.tx,
                y: event.ty,
                width: event.element.centerX * 2,
                height: event.element.centerY * 2
            });
            console.log($scope.orderedWords);
        }

    }]);

})();